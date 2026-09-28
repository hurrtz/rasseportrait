import { clientLoader as topicLoader, meta as topicMeta } from "../hundewissenTopic";
import { clientLoader as areaLoader, meta as areaMeta } from "../hundewissenArea";
import useHundewissenStore from "~/stores/hundewissen";
import {
  makeIndex,
  makeTopic,
  seedHundewissen,
} from "~/pages/Hundewissen/__tests__/fixtures";

type TopicLoaderArgs = Parameters<typeof topicLoader>[0];
type TopicMetaArgs = Parameters<typeof topicMeta>[0];
type AreaLoaderArgs = Parameters<typeof areaLoader>[0];
type AreaMetaArgs = Parameters<typeof areaMeta>[0];

const title = (tags: { title?: string }[]) => tags.find((tag) => "title" in tag)?.title;

describe("/hundewissen/:area/:topic route", () => {
  it("loads the topic for the page title", async () => {
    seedHundewissen(makeIndex(), [makeTopic()]);

    const data = await topicLoader({
      params: { area: "zucht-rassen", topic: "qualzuchten" },
    } as unknown as TopicLoaderArgs);

    expect(data).toEqual({
      label: "Qualzuchten",
      description: "Zucht auf extreme Merkmale, die die Gesundheit schädigt.",
    });
  });

  it("starts loading the topic file", async () => {
    seedHundewissen(makeIndex());
    const loadTopic = jest.fn(async () => {});
    useHundewissenStore.setState((state) => ({
      actions: { ...state.actions, loadTopic },
    }));

    await topicLoader({
      params: { area: "zucht-rassen", topic: "qualzuchten" },
    } as unknown as TopicLoaderArgs);

    expect(loadTopic).toHaveBeenCalledWith("qualzuchten");
  });

  it("titles the page with topic, section and product", () => {
    expect(
      title(topicMeta({ data: { label: "Qualzuchten", description: "" } } as TopicMetaArgs)),
    ).toBe("Qualzuchten · Hundewissen · Rasseportrait");
  });

  it("titles an unknown topic as not found", async () => {
    seedHundewissen(makeIndex());

    const data = await topicLoader({
      params: { area: "zucht-rassen", topic: "gibt-es-nicht" },
    } as unknown as TopicLoaderArgs);

    expect(data).toEqual({ label: null, description: null });
    expect(title(topicMeta({ data } as TopicMetaArgs))).toBe(
      "Thema nicht gefunden · Hundewissen · Rasseportrait",
    );
  });
});

describe("/hundewissen/:area route", () => {
  it("loads the area name for the page title", async () => {
    seedHundewissen(makeIndex());

    const data = await areaLoader({
      params: { area: "zucht-rassen" },
    } as unknown as AreaLoaderArgs);

    expect(data).toEqual({ name: "Zucht & Rassen" });
    expect(title(areaMeta({ data } as AreaMetaArgs))).toBe(
      "Zucht & Rassen · Hundewissen · Rasseportrait",
    );
  });

  it("titles an unknown area as not found", async () => {
    seedHundewissen(makeIndex());

    const data = await areaLoader({
      params: { area: "kochen" },
    } as unknown as AreaLoaderArgs);

    expect(title(areaMeta({ data } as AreaMetaArgs))).toBe(
      "Bereich nicht gefunden · Hundewissen · Rasseportrait",
    );
  });
});
