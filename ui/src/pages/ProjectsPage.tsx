interface Project {
  url: string;
  name: string;
  description: string;
  imagePath: string;
}

const projects: Project[] = [
  {
    url: "https://github.com/gregorychen3/espresso-controller",
    name: "Espresso Controller",
    description: "PID temperature control on Raspberry Pi for espresso machines",
    imagePath: "",
  },
  {
    url: "https://github.com/gregorychen3/recipe-book",
    name: "Greg and Ally's Recipe Book",
    description: "Greg and Ally's Recipe Book",
    imagePath: "",
  },
  {
    url: "https://gregorychen3.github.io/liquor-buddy-website",
    name: "LiquorBuddy",
    description: "Mobile app for saving money at liquor stores (decommissioned)",
    imagePath: "",
  },
  {
    url: "https://github.com/gregorychen3/mui-label-divider",
    name: "mui-label-divider",
    description: "Labeled divider component for Material-UI / React",
    imagePath: "",
  },
];

export function ProjectsPage() {
  return (
    <div>
      {projects.map((p) => (
        <pre>{JSON.stringify(p, null, 2)}</pre>
      ))}
    </div>
  );
}
