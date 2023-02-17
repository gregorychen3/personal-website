import { Grid } from "@mui/material";
import { MediaCard } from "../components/MediaCard";

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
    imagePath: `${process.env.PUBLIC_URL}/espresso_controller.png`,
  },
  {
    url: "https://ga-recipe-book.herokuapp.com/recipes",
    name: "Recipe Book",
    description: "Greg and Ally's Recipe Book",
    imagePath: `${process.env.PUBLIC_URL}/recipe_book.png`,
  },
  {
    url: "https://gregorychen3.github.io/liquor-buddy-website",
    name: "LiquorBuddy",
    description: "Mobile app for saving money at liquor stores",
    imagePath: `${process.env.PUBLIC_URL}/liquor_buddy.png`,
  },
  {
    url: "https://github.com/gregorychen3/mui-label-divider",
    name: "mui-label-divider",
    description: "Labeled divider component for Material UI and React",
    imagePath: `${process.env.PUBLIC_URL}/mui_label_divider.png`,
  },
];

export function ProjectsPage() {
  return (
    <Grid container spacing={6}>
      {projects.map((p) => (
        <Grid item sm={12} md={6} sx={{ width: "100%" }}>
          <MediaCard
            title={p.name}
            description={p.description}
            mediaUrl={p.imagePath}
            onClick={() => window.open(p.url, "_blank", "noreferrer")}
            key={p.url}
          />
        </Grid>
      ))}
    </Grid>
  );
}
