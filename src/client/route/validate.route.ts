import Express, { NextFunction } from 'express';
import { validationResult } from "express-validator";
import { CreateProfileRequest } from '../dto/create-profile.dto';
import { ErrorDto } from '../dto/error.dto';
import { ProfileDto } from '../dto/profile.dto';

export const validate = (request: Express.Request<never, never, CreateProfileRequest>,
    response: Express.Response<ProfileDto | ErrorDto>, next: NextFunction) => {
    const errors = validationResult(request)
    if (errors.isEmpty()) {
        return next()
    }
    return response.status(422).json({
        timestamp: new Date().toUTCString(),
        status: 422,
        error: 'Validation error',
        message: 'Bad request'
    })
}