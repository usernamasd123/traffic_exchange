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
import { TrafficProvider } from '../../types';
import { trafficProviderService } from '../../services/api';

export const TrafficProviderList: React.FC = () => {
    const [providers, setProviders] = useState<TrafficProvider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await trafficProviderService.getAll();
                setProviders(response);
            } catch (error) {
                console.error('Error fetching providers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'success';
            case 'pending':
                return 'warning';
            case 'inactive':
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
                Поставщики трафика
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {providers.map((provider) => (
                        <Box key={provider.id} sx={{ width: { xs: '100%', sm: '50%', md: '33.33%' }, p: 1 }}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {provider.name}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        ID: {provider.id}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        {provider.description}
                                    </Typography>
                                    <Chip
                                        label={provider.status}
                                        color={getStatusColor(provider.status) as any}
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