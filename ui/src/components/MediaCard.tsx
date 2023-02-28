import { CardActionArea, styled } from "@mui/material";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Card = styled(MuiCard)(() => ({
  height: "100%",
}));

interface MediaCardProps {
  title: string;
  description: string;
  mediaUrl: string;
  onClick?: () => void;
}

export function MediaCard({ title, description, mediaUrl, onClick }: MediaCardProps) {
  return (
    <Card variant="outlined" onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardMedia component="img" height="194px" image={mediaUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
