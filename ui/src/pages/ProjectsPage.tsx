import { Grid } from "@mui/material";
import { MediaCard } from "../components/MediaCard";
import espressoControllerImg from "../assets/espresso_controller.png";
import recipeBookImg from "../assets/recipe_book.png";
import liquorBuddyImg from "../assets/liquor_buddy.png";
import muiLabelDividerImg from "../assets/mui_label_divider.png";

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
    description: "PID temperature control on Raspberry Pi",
    imagePath: espressoControllerImg,
  },
  {
    url: "https://ga-recipe-book.herokuapp.com/recipes",
    name: "Recipe Book",
    description: "Greg and Ally's Recipe Book",
    imagePath: recipeBookImg,
  },
  {
    url: "https://gregorychen3.github.io/liquor-buddy-website",
    name: "LiquorBuddy",
    description: "Mobile app for saving money at liquor stores",
    imagePath: liquorBuddyImg,
  },
  {
    url: "https://github.com/gregorychen3/mui-label-divider",
    name: "mui-label-divider",
    description: "Component for Material UI and React",
    imagePath: muiLabelDividerImg,
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
