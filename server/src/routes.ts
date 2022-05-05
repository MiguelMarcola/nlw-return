
import nodemailer from "nodemailer";
import express from "express";
import { prisma } from "./prisma";
import { SubmitFeedbacksUseCase } from "./useCases/submitFeedbackUseCase";
import { PrismaFeedbacksRepository } from "./prisma/prismaFeedbacksRepository";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";

export const routes = express.Router()

routes.post("/feedbacks", async (request, response) => {
    const { type, comment, screenshot } = request.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const submitFeedbacksUseCase = new SubmitFeedbacksUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);

    await submitFeedbacksUseCase.execute({
        type,
        comment,
        screenshot
    })

    response.status(201).send();
})