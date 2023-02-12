import { styled } from "@mui/material";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Card = styled(MuiCard)(({ onClick }) =>
  onClick
    ? {
        height: "100%",
        cursor: "pointer",
        ":hover": { opacity: 0.8 },
      }
    : { height: "100%" }
);

interface MediaCardProps {
  title: string;
  description: string;
  mediaUrl: string;
  onClick?: () => void;
}

export function MediaCard({ title, description, mediaUrl, onClick }: MediaCardProps) {
  return (
    <Card variant="outlined" onClick={onClick}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardMedia component="img" height="194" image={mediaUrl} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
