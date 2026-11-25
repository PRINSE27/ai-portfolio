export type Project = {
  title: string
  kind: string
  description: string
  tech: string[]
  link: string
}

export const PROJECTS: Project[] = [
  {
    title: 'CareerLens',
    kind: 'Full-stack platform',
    description:
      'A career platform built to analyze resumes and recommend jobs, with secure authentication and a dashboard.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Prisma'],
    link: 'https://github.com/PRINSE27/career-lens',
  },
  {
    title: 'LeetCode Solutions',
    kind: 'Problem solving',
    description:
      'A growing collection of LeetCode solutions written in C++ to prepare for coding interviews.',
    tech: ['C++', 'Data Structures', 'Algorithms'],
    link: 'https://github.com/PRINSE27/LeetCode',
  },
  {
    title: 'Weather Now',
    kind: 'Web app',
    description: 'A weather app. Replace this line with what it really does.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/PRINSE27/weather-now',
  },
]