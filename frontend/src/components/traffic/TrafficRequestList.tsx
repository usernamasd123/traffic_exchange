import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    CircularProgress,
    Grid,
    Box,
} from '@mui/material';
import { TrafficRequest } from '../../types';
import { trafficRequestService } from '../../services/api';

export const TrafficRequestList: React.FC = () => {
    const [requests, setRequests] = useState<TrafficRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await trafficRequestService.getAll();
                setRequests(response);
            } catch (error) {
                console.error('Error fetching requests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'success';
            case 'pending':
                return 'warning';
            case 'completed':
                return 'info';
            case 'cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Заявки на трафик
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {requests.map((request) => (
                        <Box key={request.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        Заявка #{request.id}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        Тип трафика: {request.traffic_type}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        Количество: {request.quantity}
                                    </Typography>
                                    <Chip
                                        label={request.status}
                                        color={getStatusColor(request.status) as any}
                                        size="small"
                                    />
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}; 