import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AdminGraph({ props }) {
  // Combine all values into graph-friendly format
  const data = [
    {
      name: "Overview",
      Sales: props.totalSale,
      Products: props.totalProducts,
      Orders: props.totalOrder,
      Pending: props.pending,
    },
  ];

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Business Overview
        </Typography>

        {/* Graph Section */}
        <Box width="100%" height={350}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="Sales" fill="#fb8c00" />
              <Bar dataKey="Products" fill="#4caf50" />
              <Bar dataKey="Orders" fill="#2196f3" />
              <Bar dataKey="Pending" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
