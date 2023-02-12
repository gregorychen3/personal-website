import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface MediaCardProps {
  title: string;
  description: string;
  mediaUrl: string;
  onClick?: () => void;
}

export function MediaCard({ title, description, mediaUrl, onClick }: MediaCardProps) {
  return (
    <Card sx={{ height: "100%", cursor: onClick ? "pointer" : undefined }} variant="outlined" onClick={onClick}>
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
