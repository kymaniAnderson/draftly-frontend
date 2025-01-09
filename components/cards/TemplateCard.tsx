"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
} from "@mui/material";

export default function TemplateCard({
  template,
}: {
  template: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    rating: number;
    hashtags: string[];
  };
}) {
  return (
    <Card sx={{ maxWidth: "100%", borderRadius: "1rem", boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={template.imageUrl}
        alt={template.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {template.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {template.description}
        </Typography>
        <Box display="flex" alignItems="center">
          <Rating name="read-only" value={template.rating} readOnly />
        </Box>
        <Box mt={1}>
          {template.hashtags.map((hashtag) => (
            <Chip
              key={hashtag}
              label={`#${hashtag}`}
              color="primary"
              size="small"
              sx={{ marginRight: 0.5 }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
