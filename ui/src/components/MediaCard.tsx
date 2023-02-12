import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface MediaCardProps {
  title: string;
  description: string;
}

export function MediaCard({ title, description }: MediaCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
