// src/modules/auth.ts
import { Elysia, t } from 'elysia'
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

/**
 * @description Authentication module
 * @param app
 * @returns
 */
export const auth = (app: Elysia) =>
    app.group('/auth', (app) =>
        app
            .model({
                sign: t.Object({
                    email: t.String({
                        format: 'email'
                    }),
                    password: t.String({
                        minLength: 8
                    })
                })
            })
            .post(
                '/sign-up',
                async ({ body }) => {
                    try {
                        const hashedPassword = await bcrypt.hash(body.password, 10)
                        const user = await prisma.user.create({
                            data: {
                                email: body.email,
                                password: hashedPassword,
                                name: body.email.split('@')[0] // Default name from email
                            }
                        })
                        
                        const { password, ...userWithoutPassword } = user
                        return userWithoutPassword
                    } catch (error) {
                        return { error: 'User creation failed' }
                    }
                },
                {
                    schema: {
                        body: 'sign'
                    }
                }
            )
            .post(
                '/sign-in',
                async ({ body, jwt }) => {
                    try {
                        const user = await prisma.user.findUnique({
                            where: {
                                email: body.email
                            }
                        })

                        if (!user) {
                            return { error: 'User not found' }
                        }

                        const validPassword = await bcrypt.compare(body.password, user.password)
                        if (!validPassword) {
                            return { error: 'Invalid password' }
                        }

                        const { password, ...userWithoutPassword } = user
                        const token = await jwt.sign(userWithoutPassword)
                        
                        return { 
                            user: userWithoutPassword,
                            token
                        }
                    } catch (error) {
                        return { error: 'Authentication failed' }
                    }
                },
                {
                    schema: {
                        body: 'sign'
                    }
                }
            )
            .get(
                '/me',
                async ({ bearer, jwt }) => {
                    if (!bearer) {
                        return { error: 'No token provided' }
                    }

                    try {
                        const payload = await jwt.verify(bearer)
                        if (!payload) {
                            return { error: 'Invalid token' }
                        }

                        const user = await prisma.user.findUnique({
                            where: {
                                id: payload.id
                            }
                        })

                        if (!user) {
                            return { error: 'User not found' }
                        }

                        const { password, ...userWithoutPassword } = user
                        return userWithoutPassword
                    } catch (error) {
                        return { error: 'Authentication failed' }
                    }
                }
            )
    )