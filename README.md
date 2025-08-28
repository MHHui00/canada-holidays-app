# Canada Public Holidays App

A React application that displays Canadian public holidays by province and date range.

## Features

- Browse holidays by province/territory
- Filter holidays by date range
- Responsive design for mobile and desktop
- Comprehensive error handling

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **UI Library**: Ant Design v5
- **State Management**: Zustand
- **Build Tool**: Vite
- **Date Handling**: dayjs
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18.17+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/MHHui00/canada-holidays-app.git
cd canada-holidays-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## API

This application uses the [Canada Holidays API](https://canada-holidays.ca/api/v1) to fetch holiday data.

**Supported Years**: 2014 - 2035

## Key Features Implementation

### Error Handling
- Network timeout handling (10 seconds)
- Year range validation (2014-2035)
- User-friendly error messages

### Date Range Features
- Preset ranges: This Month, Next 3 Months, This Year, Next Year
- Cross-year data fetching

<!-- ### State Management
- Centralized state with Zustand
- Automatic data fetching on province/date changes
- Loading and error states -->

