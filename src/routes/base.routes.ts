import express from 'express';

export interface BaseRouterConfig {
  createRoutes(): express.Router;
}