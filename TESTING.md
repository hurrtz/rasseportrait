# Testing Guide

This document describes the testing strategy and practices for the rasseportrait project.

## Table of Contents

- [Overview](#overview)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Testing Strategy](#testing-strategy)
- [Test Structure](#test-structure)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The project uses **Jest** as the test framework with **React Testing Library** for component testing. Tests are written in TypeScript and run in a jsdom environment to simulate browser behavior.

### Key Technologies

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **ts-jest**: TypeScript support for Jest
- **jsdom**: DOM simulation for tests
- **@testing-library/user-event**: User interaction simulation

## Running Tests

### Basic Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report and open HTML report
npm run test:coverage
```

### Coverage Thresholds

The project maintains **>99% test coverage** across all metrics:
- **Statements**: >99%
- **Branches**: >95%
- **Functions**: >97%
- **Lines**: >99%

## Test Coverage

### Current Coverage (as of last run)

```
File                           | % Stmts | % Branch | % Funcs | % Lines
-------------------------------|---------|----------|---------|----------
All files                      |   99.17 |     95.4 |   97.61 |   99.17
 components/BreedCard          |   95.49 |     87.5 |     100 |   95.49
 components/BreedSearch        |     100 |      100 |     100 |     100
 components/LoadingSpinner     |     100 |      100 |     100 |     100
 hooks                         |     100 |      100 |     100 |     100
 pages/rasseportrait           |     100 |    96.77 |     100 |     100
 stores                        |    98.5 |    94.25 |   96.15 |    98.5
```

### Viewing Coverage Reports

After running `npm run test:coverage`, open the HTML report:

```bash
# Automatically opens in browser after running test:coverage
open coverage/lcov-report/index.html
```

The coverage report provides:
- Line-by-line coverage visualization
- Uncovered code highlighting
- Branch coverage details
- Function coverage statistics

## Testing Strategy

### Unit Tests

Each component, hook, and utility function has dedicated unit tests:

- **Components**: Test rendering, user interactions, and prop variations
- **Hooks**: Test state management and side effects
- **Utilities**: Test pure functions with various inputs
- **Stores**: Test Zustand store actions and state updates

### Integration Tests

Integration tests verify that components work together correctly:

- **Rasseportrait page**: Full page rendering with breed data
- **Search + Cards**: Search functionality integrated with breed cards
- **Modal interactions**: Opening/closing modal with breed details

### Test Coverage Goals

1. **All user-facing features** must have tests
2. **All utility functions** must have tests
3. **Error states** must be tested
4. **Loading states** must be tested
5. **Accessibility features** should be tested

## Test Structure

### Directory Layout

Tests are colocated with the code they test:

```
app/
├── components/
│   ├── BreedCard/
│   │   ├── BreedCard.tsx
│   │   └── __tests__/
│   │       └── BreedCard.test.tsx
│   └── BreedSearch/
│       ├── BreedSearch.tsx
│       └── __tests__/
│           └── BreedSearch.test.tsx
├── stores/
│   ├── breeds.ts
│   └── __tests__/
│       └── breeds.test.ts
└── pages/
    └── rasseportrait/
        ├── Rasseportrait.tsx
        └── __tests__/
            ├── Rasseportrait.test.tsx
            └── fixtures.ts
```

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Hook tests: `hookName.test.ts`
- Utility tests: `utils.functionName.test.ts`
- Integration tests: `ComponentName.integration.test.tsx`

### Test Fixtures

Shared test data is stored in `fixtures.ts` files:

```typescript
// Example: __tests__/fixtures.ts
export const mockBreed = {
  id: 1,
  details: {
    internal: "golden-retriever",
    public: ["Golden Retriever"],
  },
  // ... rest of breed data
};
```

## Best Practices

### Writing Component Tests

```typescript
import { render, screen } from "@testing-library/react";
import { BreedCard } from "../BreedCard";

describe("BreedCard", () => {
  it("renders breed name", () => {
    render(<BreedCard breed={mockBreed} />);
    expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
  });

  it("handles click interactions", async () => {
    const onSelect = jest.fn();
    render(<BreedCard breed={mockBreed} onSelect={onSelect} />);
    
    await userEvent.click(screen.getByRole("button"));
    expect(onSelect).toHaveBeenCalledWith(mockBreed.id);
  });
});
```

### Testing Async Operations

```typescript
it("loads breed data asynchronously", async () => {
  render(<RasseportraitPage />);
  
  // Wait for loading state to disappear
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
  
  // Verify data is displayed
  expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
import userEvent from "@testing-library/user-event";

it("filters breeds on search input", async () => {
  const user = userEvent.setup();
  render(<BreedSearch />);
  
  const searchInput = screen.getByRole("textbox");
  await user.type(searchInput, "Golden");
  
  expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
  expect(screen.queryByText("Labrador")).not.toBeInTheDocument();
});
```

### Testing Accessibility

```typescript
it("has accessible keyboard navigation", async () => {
  const user = userEvent.setup();
  render(<BreedCard breed={mockBreed} />);
  
  const card = screen.getByRole("button");
  
  // Tab to focus
  await user.tab();
  expect(card).toHaveFocus();
  
  // Press Enter to activate
  await user.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalled();
});
```

### Mocking Zustand Stores

```typescript
import { useBreedStore } from "~/stores/breeds";

jest.mock("~/stores/breeds", () => ({
  useBreedStore: jest.fn(),
}));

beforeEach(() => {
  (useBreedStore as jest.Mock).mockReturnValue({
    breeds: mockBreeds,
    isLoading: false,
    error: null,
  });
});
```

### Testing Error States

```typescript
it("displays error message when loading fails", async () => {
  (useBreedStore as jest.Mock).mockReturnValue({
    breeds: [],
    isLoading: false,
    error: "Failed to load breeds",
  });
  
  render(<RasseportraitPage />);
  
  expect(screen.getByText(/Failed to load breeds/i)).toBeInTheDocument();
});
```

## Troubleshooting

### Common Issues

#### Act Warnings

If you see warnings about updates not wrapped in `act()`:

```typescript
// Use waitFor or findBy queries for async updates
await waitFor(() => {
  expect(screen.getByText("Updated")).toBeInTheDocument();
});

// Or use findBy (which includes waiting)
expect(await screen.findByText("Updated")).toBeInTheDocument();
```

#### Timer Issues

When testing debounced inputs:

```typescript
jest.useFakeTimers();

// Fast-forward time
jest.advanceTimersByTime(500);

// Or run all pending timers
jest.runOnlyPendingTimers();

// Don't forget to cleanup
jest.useRealTimers();
```

#### Mock Not Resetting

Always reset mocks between tests:

```typescript
beforeEach(() => {
  jest.clearAllMocks();
  // or
  mockFunction.mockReset();
});
```

### Test Performance

If tests are slow:

1. Use `test.only()` to run a single test during development
2. Avoid unnecessary renders with `screen.debug()` calls
3. Use `jest --maxWorkers=50%` to limit CPU usage
4. Consider splitting large test files

### Debugging Tests

```typescript
// View current DOM structure
screen.debug();

// View specific element
screen.debug(screen.getByRole("button"));

// Use logRoles to see all accessible roles
import { logRoles } from "@testing-library/react";
const { container } = render(<Component />);
logRoles(container);
```

## Continuous Integration

Tests run automatically on:

- **Pre-commit**: Via Husky hooks
- **Pull Requests**: Via GitHub Actions
- **Before releases**: Via npm prerelease script

### Local Pre-commit Testing

Tests are automatically run before commits via Husky. To skip (not recommended):

```bash
git commit --no-verify
```

## Contributing

When adding new features:

1. Write tests **before** or **alongside** implementation (TDD)
2. Ensure all tests pass: `npm test`
3. Check coverage: `npm run test:coverage`
4. Maintain >99% coverage target
5. Update this document if adding new testing patterns

## Additional Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing](https://testing-library.com/docs/queries/about/#priority)
