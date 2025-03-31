import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    CircularProgress,
    Grid,
    Box,
    Button,
} from '@mui/material';
import { Advertiser } from '../../types';
import { advertiserService } from '../../services/api';
import { RequestForm } from '../RequestForm';

export const AdvertiserList: React.FC = () => {
    const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAdvertiser, setSelectedAdvertiser] = useState<Advertiser | null>(null);
    const [requestFormOpen, setRequestFormOpen] = useState(false);

    useEffect(() => {
        const fetchAdvertisers = async () => {
            try {
                const response = await advertiserService.getAll();
                setAdvertisers(response);
            } catch (error) {
                console.error('Error fetching advertisers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvertisers();
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

    const handleRequestClick = (advertiser: Advertiser) => {
        setSelectedAdvertiser(advertiser);
        setRequestFormOpen(true);
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
                Рекламодатели
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {advertisers.map((advertiser) => (
                        <Grid item key={advertiser.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {advertiser.name}
                                    </Typography>
                                    <Typography color="textSecondary" gutterBottom>
                                        ID: {advertiser.id}
                                    </Typography>
                                    <Typography variant="body2" paragraph>
                                        {advertiser.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <Chip
                                            label={advertiser.status}
                                            color={getStatusColor(advertiser.status) as any}
                                            size="small"
                                        />
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() => handleRequestClick(advertiser)}
                                        >
                                            Оставить заявку
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {selectedAdvertiser && (
                <RequestForm
                    open={requestFormOpen}
                    onClose={() => {
                        setRequestFormOpen(false);
                        setSelectedAdvertiser(null);
                    }}
                    type="advertiser"
                    targetId={selectedAdvertiser.id}
                />
            )}
        </Box>
    );
}; 