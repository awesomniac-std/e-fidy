import { useForm } from '@mantine/form';
import { useNavigate } from "react-router-dom";

import {
    createStyles,
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Anchor,
    Stack,
} from '@mantine/core';

const useStyles = createStyles(() => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },

    paper: {
        width: '40%',
        marginTop: '10%',

        [`@media (max-width: 600px)`]: {
            width: '90%'
        },
    }

}))

export default function Login() {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    function register() {
       navigate('/register')
    }

    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper} radius="md" p="xl" withBorder>
                <Text size="lg" weight={500}>
                    LogIn
                </Text>

                <form onSubmit={form.onSubmit((data) => { console.log(data) })}>
                    <Stack>
                        <TextInput
                            required
                            label="Email"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                        />

                        <PasswordInput
                            required
                            label="Password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                        />
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => register()}
                            size="xs"
                        >
                            Don't have an account? Register
                        </Anchor>
                        <Button type="submit">Log In</Button>
                    </Group>
                </form>
            </Paper>
        </div>
    );
}