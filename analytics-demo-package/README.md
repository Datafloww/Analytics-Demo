# React TypeScript Todo App – Analytics Demo

This is a simple Todo application built using **React** and **TypeScript**, created to demonstrate the integration of the [@datafloww/analytics](https://www.npmjs.com/package/@datafloww/analytics) package.

## Features

-   Add and delete todos
-   Mark todos as complete/incomplete
-   Analytics tracking with `@datafloww/analytics`

## Getting Started

### Prerequisites

-   Node.js (>= 14)
-   npm or yarn

### Installation

1. **Clone the repository:**

```bash
i. git clone https://github.com/Datafloww/Analytics-Demo.git
cd react-ts-todo-analytics-demo
```

    ii. `cd analytics-demo-package`

2. Install dependencies:`npm install`

The app should now be running on http://localhost:3000.

### Setup

1. Install the analytics package: `npm install @datafloww/analytics`

2. Initialize analytics in your app (e.g., in App.tsx):

```
import { Analytics } from '@datafloww/analytics';

const analytics = new Analytics({ apiKey: 'your-api-key' });

analytics.track('app_loaded');
```

3. Track events (example inside a todo action):

```const handleAddTodo = () => {
  // ... your todo adding logic
  analytics.track('todo_added', { label: todoText });
};
```
