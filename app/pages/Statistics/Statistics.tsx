import React from "react";
import { Link } from "react-router";
import type { Breed } from "types/breed";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { LOADING_MESSAGE } from "~/constants";
import { useEnsureBreeds } from "~/hooks/useEnsureBreeds";
import { useAllBreeds, useBreedActions, useRawBreeds } from "~/stores/breeds";
import {
  fciGroupLabel,
  findDisplayBreed,
  getNewestPortraitBreed,
  getPrimaryPortrait,
} from "~/utils/breed";
import {
  formatDateLong,
  formatEpisode,
  formatMonth,
  formatMonthYear,
  formatPercent,
} from "~/utils/format";
import {
  AMOUNT_OF_BREEDS_APPROVED,
  AMOUNT_OF_BREEDS_PROVISIONAL,
  AMOUNT_OF_BREEDS_TOTAL,
} from "../rasseportrait/constants";
import {
  getPortraitsPerFciGroup,
  getPortraitsPerYear,
  getStatistics,
} from "../rasseportrait/utils";
import ChipList from "./components/ChipList";
import GroupBars from "./components/GroupBars";
import ProgressBar from "./components/ProgressBar";
import StatCard from "./components/StatCard";
import YearChart from "./components/YearChart";
import classes from "./Statistics.module.css";

const rassen = (count: number) => (count === 1 ? "Rasse" : "Rassen");

/** "Molosser und Hütehunde vorn": the two groups with the most portraits */
const leadingGroupsHeadline = (groups: { group: number; count: number }[]) => {
  const leading = [...groups]
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count || a.group - b.group)
    .slice(0, 2)
    .map(({ group }) => fciGroupLabel(group)!.short);
  return leading.length
    ? `${leading.join(" und ")} vorn`
    : "Noch keine Portraits";
};

interface HostProps {
  name: string;
  correct: number;
  total: number;
  percentage: number;
  caveat?: React.ReactNode;
}

const HostRate = ({ name, correct, total, percentage, caveat }: HostProps) => (
  <div className={classes.host}>
    <div className={classes.hostHead}>
      <span className={classes.hostName}>{name}</span>
      <span className={classes.hostRate}>{formatPercent(percentage)}</span>
    </div>
    <ProgressBar value={percentage} className={classes.medium} />
    <p className={classes.caption}>
      {correct} von {total} erratbaren {rassen(total)} richtig.
      {caveat && <> {caveat}</>}
    </p>
  </div>
);

const StatisticsContent = () => {
  const rawBreeds = useRawBreeds();
  const displayBreeds = useAllBreeds();

  const stats = getStatistics(rawBreeds);
  const perYear = getPortraitsPerYear(rawBreeds);
  const perGroup = getPortraitsPerFciGroup(rawBreeds);
  const newest = getNewestPortraitBreed(rawBreeds);
  const stand = newest && getPrimaryPortrait(newest);

  const toChip = (raw: Breed) => {
    const breed = findDisplayBreed(displayBreeds, raw);
    return (
      breed && { label: raw.details.public[0], to: `/rasse/${breed.slug}` }
    );
  };
  const chips = (breeds: Breed[]) =>
    breeds.map(toChip).filter((chip) => chip !== undefined);

  const waterDog = rawBreeds.find(
    ({ details }) => details.internal === "spanish_water_dog",
  );
  const waterDogPage = waterDog && toChip(waterDog)?.to;

  return (
    <div className={classes.page}>
      <header className={classes.head}>
        <h1 className={classes.title}>Statistik</h1>
        {stand && (
          <span className={classes.stand}>
            Stand: {formatEpisode(stand.number)},{" "}
            {formatDateLong(stand.meta.airDate)}
          </span>
        )}
      </header>

      <div className={classes.grid}>
        <StatCard eyebrow="FCI-Rasseliste" className={classes.fciCard}>
          <div className={classes.fciNumbers}>
            <span className={classes.fciCount}>
              {stats.amountBreedsPresented}
              <span className={classes.fciTotal}>
                {" "}
                von {AMOUNT_OF_BREEDS_TOTAL}
              </span>
            </span>
            <span className={classes.fciRate}>
              {formatPercent(stats.percentageBreedsPresented)}
            </span>
          </div>
          <ProgressBar
            value={stats.percentageBreedsPresented}
            className={classes.thick}
          />
          <p className={classes.caption}>
            Vorgestellte Rassen aus der FCI-Liste: {AMOUNT_OF_BREEDS_APPROVED}{" "}
            anerkannte und {AMOUNT_OF_BREEDS_PROVISIONAL} vorläufig anerkannte
            Rassen.
          </p>
        </StatCard>

        <StatCard eyebrow="Wer errät die Rasse?" className={classes.guessCard}>
          <HostRate
            name="Martin"
            correct={stats.martinCorrectGuesses}
            total={stats.martinCorrectGuessesOutOfTotal}
            percentage={stats.martinCorrectGuessesPercentage}
            caveat={
              waterDog && (
                <>
                  Der{" "}
                  {waterDogPage ? (
                    <Link
                      to={waterDogPage}
                      state={{ from: "statistics" }}
                      className={classes.inlineLink}
                    >
                      Spanische Wasserhund
                    </Link>
                  ) : (
                    "Spanische Wasserhund"
                  )}{" "}
                  wird nicht gewertet.
                </>
              )
            }
          />
          <hr className={classes.divider} />
          <HostRate
            name="Katharina"
            correct={stats.katharinaCorrectGuesses}
            total={stats.katharinaCorrectGuessesOutOfTotal}
            percentage={stats.katharinaCorrectGuessesPercentage}
          />
        </StatCard>

        {perYear.firstAirDate && perYear.lastAirDate && (
          <StatCard eyebrow="Portraits pro Jahr" className={classes.yearCard}>
            <h2 className={classes.cardTitle}>
              Seit {formatMonthYear(perYear.firstAirDate)} im Podcast
            </h2>
            <YearChart years={perYear.years} />
            <p className={classes.note}>
              {perYear.lastAirDate.slice(0, 4)} bis{" "}
              {formatMonth(perYear.lastAirDate)}, gestrichelt.
            </p>
          </StatCard>
        )}

        <StatCard
          eyebrow="Portraits je FCI-Gruppe"
          className={classes.groupCard}
        >
          <h2 className={classes.cardTitle}>
            {leadingGroupsHeadline(perGroup.groups)}
          </h2>
          <GroupBars groups={perGroup.groups} />
          <p className={classes.note}>
            Dazu {perGroup.withoutFci} {rassen(perGroup.withoutFci)} ohne
            FCI-Anerkennung.
          </p>
        </StatCard>

        <StatCard
          eyebrow="Außerhalb der FCI-Liste vorgestellt"
          className={classes.outsideCard}
        >
          <ChipList chips={chips(stats.breedsOutsideFCI)} />
          {stats.breedsNotPresented.length > 0 && (
            <>
              <hr className={classes.divider} />
              <div className={classes.mentioned}>
                <span className={classes.eyebrow}>
                  Erwähnt, noch nicht vorgestellt
                </span>
                <ChipList chips={chips(stats.breedsNotPresented)} />
              </div>
            </>
          )}
        </StatCard>
      </div>
    </div>
  );
};

const Statistics = () => {
  const status = useEnsureBreeds();
  const { initialize } = useBreedActions();

  if (status === "error") {
    return (
      <LoadError
        title="Die Statistik konnte nicht geladen werden."
        onRetry={initialize}
      />
    );
  }
  if (status !== "ready") return <LoadingSpinner message={LOADING_MESSAGE} />;

  return <StatisticsContent />;
};

export default Statistics;
