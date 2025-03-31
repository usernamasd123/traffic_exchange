import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    ThemeProvider,
    createTheme,
    Tabs,
    Tab,
} from '@mui/material';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { TrafficRequestList } from './components/traffic/TrafficRequestList';
import { TrafficProviderList } from './components/traffic/TrafficProviderList';
import { AdvertiserList } from './components/traffic/AdvertiserList';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function App() {
    const isAuthenticated = !!localStorage.getItem('token');
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Биржа трафика
                            </Typography>
                            <Button color="inherit" component={Link} to="/">
                                Главная
                            </Button>
                            <Button color="inherit" component={Link} to="/requests">
                                Заявки
                            </Button>
                            <Button color="inherit" component={Link} to="/providers">
                                Поставщики
                            </Button>
                            {isAuthenticated ? (
                                <Button color="inherit" onClick={() => localStorage.removeItem('token')}>
                                    Выйти
                                </Button>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/login">
                                        Войти
                                    </Button>
                                    <Button color="inherit" component={Link} to="/register">
                                        Регистрация
                                    </Button>
                                </>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Box sx={{ width: '100%', mt: 4 }}>
                            <Typography variant="h3" component="h1" gutterBottom align="center">
                                Traffic Exchange
                            </Typography>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} centered>
                                    <Tab label="Провайдеры трафика" />
                                    <Tab label="Рекламодатели" />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <TrafficProviderList />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <AdvertiserList />
                            </TabPanel>
                        </Box>
                    </Container>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
