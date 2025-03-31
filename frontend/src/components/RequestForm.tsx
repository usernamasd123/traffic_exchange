import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from '@mui/material';
import { requestService } from '../services/api';

interface RequestFormProps {
    open: boolean;
    onClose: () => void;
    type: 'provider' | 'advertiser';
    targetId: number;
}

export const RequestForm: React.FC<RequestFormProps> = ({ open, onClose, type, targetId }) => {
    const [telegram, setTelegram] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await requestService.create({
                type,
                target_id: targetId,
                telegram,
                message,
            });
            onClose();
        } catch (error) {
            console.error('Error creating request:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Оставить заявку {type === 'provider' ? 'поставщику трафика' : 'рекламодателю'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Telegram"
                            value={telegram}
                            onChange={(e) => setTelegram(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Сообщение"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Отмена</Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Отправка...' : 'Отправить'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}; 