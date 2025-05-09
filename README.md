[![ci-nextjs-application-template](https://github.com/ics-software-engineering/nextjs-application-template/actions/workflows/ci.yml/badge.svg)](https://github.com/ics-software-engineering/nextjs-application-template/actions/workflows/ci.yml)

For details, please see http://ics-software-engineering.github.io/nextjs-application-template/.

1. [Create a GitHub Organization and Home Page](https://courses.ics.hawaii.edu/ics314s25/morea/project-management/experience-github-organization.html)

2. [Experience Team Presentation](https://courses.ics.hawaii.edu/ics314s25/morea/project-management/experience-team-presentation.html)

3. [Final Project: Milestone 1](https://courses.ics.hawaii.edu/ics314s25/morea/final-project/experience-final-project-m1.html)

4. [EC Project Management: Effort Estimation](https://courses.ics.hawaii.edu/ics314s25/morea/project-management/experience-effort-estimation.html)
 
5. [Final Project: Milestone 2](https://courses.ics.hawaii.edu/ics314s25/morea/final-project/experience-final-project-m2.html)

6. [EC Project Management: Effort Estimation 2](https://laulima.hawaii.edu/portal/site/MAN.87147.202530/tool/fa88c289-b233-47f7-8790-62d4f5747b76?panel=Main)

7. [Final Project: Milestone 3](https://courses.ics.hawaii.edu/ics314s25/morea/final-project/experience-final-project-m3.html)

# CLONE THE REPOSITORY
Clone the repository to your local machine using Git.
```
git clone https://github.com/campus-careers/campus-careers-app.git
cd your-repo-name
```

# INSTALL DEPENDENCIES

Install Node.js and npm (if not already installed):
- Download for Windows/macOS: https://nodejs.org/en/download
- Ubuntu/Debian: ```sudo apt install nodejs npm```

Install PostgreSQL:
- Official download page (Windows/macOS/Linux): https://www.postgresql.org/download/
- Homebrew (Mac): ```brew install postgresql```
- Ubuntu/Debian: ```sudo apt install postgresql postgresql-contrib```

Make sure you have Node.js (v18+) and npm installed.
Then install the project's dependencies:
```
npm install
```


# SET UP THE ENVIRONMENT FILE

Create and configure your local environment file:
```
cp sample.env .env  # Use `copy sample.env .env` on Windows
```

Update the DATABASE_URL in the `.env` file:
```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/your-database-name?schema=public
```
Tip: If you don't have a PostgreSQL user yet, you can create one using:
```
createuser your-username --pwprompt
```
Then grant it access to the database if needed.


Copy the example environment file and edit it with your settings:
```
cp sample.env .env
```
Update the DATABASE_URL in the `.env` file:
```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/your-database-name?schema=public
```


DATABASE SETUP (PostgreSQL + Prisma)

Make sure PostgreSQL is running locally before running these commands.
If you're using Windows and don't have CLI tools like `createdb`, consider using pgAdmin or DBeaver.


1. Create the database:
createdb your-database-name

2. Run migrations to set up tables:
npx prisma migrate dev

3. Seed the database with sample data:
npx prisma db seed

Tip: Ensure that you have a valid seed file defined in `prisma/seed.ts` or `prisma/seed.js`.
If not set up, seeding will fail. See Prisma docs: https://www.prisma.io/docs/guides/database/seed-database
```
npx prisma db seed
```
# CODE LINTING AND FORMATTING

Run ESLint to check the codebase for errors and style issues.
This helps maintain code quality and consistency.
```
npm run lint
```

# STARTING THE DEVELOPMENT SERVER

This command runs the Next.js development server.
By default, it starts at `http://localhost:3000`
Open your browser and go to that URL to view the app.
```
npm run dev
```


# TESTING THE APPLICATION (Manual Verification)

To test if the app works:
1. Open a terminal.
2. Run the development server with `npm run dev`.
3. Open your browser and go to:
http://localhost:3000
4. Navigate through the app and verify the landing page and features are loading properly.
