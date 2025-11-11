# Unit Testing Guide

This project uses **Vitest** for unit testing with **React Testing Library** for component testing.

## Getting Started

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Run Tests
\`\`\`bash
npm run test
\`\`\`

### Run Tests in UI Mode
\`\`\`bash
npm run test:ui
\`\`\`

### Generate Coverage Report
\`\`\`bash
npm run test:coverage
\`\`\`

## Project Structure

\`\`\`
src/
├── __tests__/
│   ├── utils/
│   │   ├── helper.test.ts        # Tests for helper utilities
│   │   └── axios.test.ts          # Tests for axios configuration
│   └── components/
│       ├── Header.test.tsx        # Tests for Header component
│       └── Footer.test.tsx        # Tests for Footer component
└── ...
\`\`\`

## Test Categories

### 1. Utility Tests (`src/__tests__/utils/`)
Tests for pure functions and helper utilities:
- Color detection (`isDarkColor`)
- Text manipulation (`cutText`, `capitalizeFirstLetter`)
- Email validation (`isValidEmail`)
- Formatting functions (`formatCurrency`, `priceRender`)
- Time utilities (`timeAgo`, `diffTimeByNow`)
- Object utilities (`isset`, `toRaw`)

### 2. Component Tests (`src/__tests__/components/`)
Tests for React components:
- Header component
- Footer component
- Layout components

### 3. Store Tests (`src/__tests__/store/`)
Tests for Jotai state management atoms

## Writing Tests

### Utility Test Example
\`\`\`typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "@/utils/helper";

describe("myFunction", () => {
  it("should do something", () => {
    const result = myFunction("input");
    expect(result).toBe("expected output");
  });
});
\`\`\`

### Component Test Example
\`\`\`typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "@/components/MyComponent";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
\`\`\`

## Key Testing Libraries

- **Vitest**: Fast unit test framework
- **React Testing Library**: React component testing utilities
- **JSDOM**: DOM implementation for Node.js
- **@testing-library/user-event**: User interaction simulation

## Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not how it does it
2. **Use descriptive test names**: Make it clear what is being tested
3. **Keep tests isolated**: Each test should be independent
4. **Mock external dependencies**: Mock API calls, routing, etc.
5. **Test edge cases**: Include tests for boundary conditions and error states

## Continuous Integration

Add to your CI/CD pipeline:
\`\`\`bash
npm run test -- --run
npm run test:coverage
\`\`\`

## Debugging Tests

Run tests in UI mode for visual debugging:
\`\`\`bash
npm run test:ui
\`\`\`

This opens an interactive dashboard where you can:
- View all tests
- Run individual tests
- See detailed error messages
- Debug with browser DevTools
\`\`\`
</markdown>
