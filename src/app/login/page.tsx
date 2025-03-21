'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Divider,
    rem,
    Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBrandGoogle, IconBrandGithub } from '@tabler/icons-react';
import { Anton } from 'next/font/google';
import classes from '@styles/login/login.module.css';

const titleFont = Anton({
    weight: '400',
    subsets: ['latin'],
});

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        validate: {
            email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value: string) => (value.length >= 6 ? null : 'Password should include at least 6 characters'),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true);
        try {
            // This would be replaced with actual authentication logic
            console.log('Login attempt with:', values);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirect to homepage after successful login
            router.push('/');
        } catch (error) {
            console.error('Login failed:', error);
            form.setErrors({ email: 'Login failed. Please check your credentials.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.backgroundCircle} ${classes.backgroundCircleTopRight}`}></div>
            <div className={`${classes.backgroundCircle} ${classes.backgroundCircleBottomLeft}`}></div>

            <Container size={420} my={40}>
                <Title ta="center" className={`${classes.title} ${titleFont.className}`}>
                    <Text
                        component="span"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'purple', deg: 90 }}
                        inherit
                    >
                        Welcome Back
                    </Text>
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Don&apos;t have an account yet?{' '}
                    <Anchor size="sm" component="button" onClick={() => router.push('/signup')}>
                        Create account
                    </Anchor>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.formContainer}>
                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <TextInput
                            label="Email"
                            placeholder="your@email.com"
                            required
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            required
                            mt="md"
                            {...form.getInputProps('password')}
                        />
                        <Group justify="space-between" mt="lg">
                            <Checkbox label="Remember me" {...form.getInputProps('rememberMe', { type: 'checkbox' })} />
                            <Anchor component="button" size="sm" onClick={() => router.push('/forgot-password')}>
                                Forgot password?
                            </Anchor>
                        </Group>
                        <Button fullWidth mt="xl" type="submit" loading={loading} className={classes.button}>
                            Sign in
                        </Button>
                    </form>

                    <Divider label="Or continue with" labelPosition="center" my="lg" />

                    <Group grow mb="md" mt="md">
                        <Button
                            variant="default"
                            leftSection={<IconBrandGoogle style={{ width: rem(20), height: rem(20) }} />}
                            className={classes.socialButton}
                        >
                            Google
                        </Button>
                        <Button
                            variant="default"
                            leftSection={<IconBrandGithub style={{ width: rem(20), height: rem(20) }} />}
                            className={classes.socialButton}
                        >
                            GitHub
                        </Button>
                    </Group>
                </Paper>
            </Container>
        </div>
    );
}
