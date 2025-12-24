<!-- @format -->

# Security Workforce User Portal

A comprehensive security workforce management platform built with modern web technologies, designed to streamline security operations, job management, contract handling, and workforce coordination.

## 📋 Overview

The Security Workforce User Portal is a professional web application that enables security companies to manage their operations efficiently. It provides tools for job posting and management, applicant selection, contract generation, payroll tracking, operative management, and more.

## ✨ Features

### 🏢 Core Modules

- **Dashboard** - Real-time overview of operations, analytics, and key metrics with interactive charts
- **Job Management** - Create, manage, and track security job postings with detailed requirements
- **Applicant Management** - Review applicants, select candidates, and manage selected operatives
- **Contract Management** - Generate, view, and manage employment contracts with digital signatures
- **Operatives Tracker** - Monitor operative performance, ratings, and availability
- **Preferred Operatives** - Maintain a list of trusted and preferred security personnel
- **Payroll Management** - Track and manage operative compensation and payment schedules
- **Referral System** - Manage user referrals with shareable referral links
- **Settings** - Configure account details, billing information, and document management
- **Support & Chat** - Built-in support system with messaging capabilities

### 🎯 Key Functionalities

- **Job Creation** - Comprehensive job posting with location, timing, pay rates, license requirements, and more
- **Applicant Selection** - Review applicant profiles with ratings and experience details
- **Contract Generation** - Professional employment contracts with detailed terms and conditions
- **Document Management** - Upload, store, and track security certifications and licenses
- **Search & Filtering** - Advanced search capabilities across all modules
- **Responsive Design** - Fully responsive interface optimized for desktop and mobile devices
- **Interactive Tables** - Sortable, paginated tables with custom actions
- **Status Management** - Track job status, contract status, and payment status with visual indicators

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - Latest React version with modern features
- **TypeScript 5** - Type-safe development

### UI Components & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible React components
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful, consistent icon library
- **Recharts 3.4.1** - Composable charting library

### Development Tools

- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **class-variance-authority** - Type-safe component variants
- **clsx & tailwind-merge** - Utility for conditional CSS classes

## 📁 Project Structure

```
security-workforce-user/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── chat/                     # Chat/messaging module
│   │   ├── contracts/                # Contract management
│   │   │   └── [contractId]/         # Dynamic contract details
│   │   ├── job-management/           # Job posting and management
│   │   │   ├── create-new-job/       # Job creation form
│   │   │   └── [jobId]/              # Dynamic job details
│   │   │       └── selected-applicants/  # Selected applicants view
│   │   ├── my-referral-user/         # Referral tracking
│   │   ├── operatives-tracker/       # Operative monitoring
│   │   ├── payroll/                  # Payment management
│   │   ├── preferred-operatives/     # Preferred personnel list
│   │   ├── settings/                 # User settings
│   │   └── support/                  # Support system
│   ├── components/
│   │   ├── CommonComponents/         # Reusable components
│   │   │   ├── CustomTable.tsx       # Generic table component
│   │   │   ├── DashboardSidebar.tsx  # Navigation sidebar
│   │   │   └── LogOutModal.tsx       # Logout confirmation
│   │   ├── ContractComponents/       # Contract-specific components
│   │   ├── JobManagementComponents/  # Job management components
│   │   ├── SettingsComponents/       # Settings page components
│   │   └── ui/                       # shadcn/ui components
│   ├── data/                         # Sample data and mock data
│   ├── types/                        # TypeScript type definitions
│   ├── hooks/                        # Custom React hooks
│   └── lib/                          # Utility functions
├── public/                           # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Rahul-Mallik-CSE/Security-Workforce-User.git
   cd security-workforce-user
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

## 📱 Application Routes

- `/` - Dashboard (Home page)
- `/job-management` - Job listings and management
- `/job-management/create-new-job` - Create new job posting
- `/job-management/[jobId]` - Job details and applicants
- `/job-management/[jobId]/selected-applicants` - Selected applicants
- `/contracts` - Contract management
- `/contracts/[contractId]` - Individual contract details
- `/operatives-tracker` - Operative monitoring
- `/preferred-operatives` - Preferred personnel list
- `/payroll` - Payroll management
- `/my-referral-user` - Referral tracking
- `/settings` - Account settings
- `/support` - Support and help
- `/chat` - Messaging system

## 🎨 Design System

The application uses a consistent design system with:

- **Color Palette**: Orange primary (#F97316), Blue secondary (#1E3A8A), Green success, Red alerts
- **Typography**: System fonts optimized with Next.js font optimization
- **Component Library**: shadcn/ui for consistent, accessible components
- **Icons**: Lucide React for a cohesive icon system
- **Spacing**: Consistent spacing scale following Tailwind conventions

## 🔒 Key Components

### CustomTable

Reusable table component with pagination, sorting, and custom cell rendering.

### DashboardSidebar

Responsive navigation sidebar with active state management and collapsible design.

### Job Management Components

- `CreateNewJobForm` - Comprehensive job creation with 17+ fields
- `JobRequirementsCard` - Display job requirements
- `ApplicantsCard` - Applicant profile cards with selection

### Contract Components

- `EmploymentContractDetails` - Contract information display
- `PartiesSection` - Employer and employee details
- `RemunerationSection` - Payment terms and rates
- `AcceptanceSignature` - Digital signature section

## 🔧 Configuration

The project uses several configuration files:

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS customization
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.mjs` - ESLint rules
- `components.json` - shadcn/ui configuration

## 📦 Building for Production

```bash
npm run build
npm run start
```

This creates an optimized production build in the `.next` folder.

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy this application is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

The application can be deployed to any platform that supports Node.js:

- AWS Amplify
- Netlify
- Railway
- Render
- DigitalOcean App Platform

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📧 Contact

For questions or support, please contact the development team.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Version**: 0.1.0  
**Last Updated**: November 2025
