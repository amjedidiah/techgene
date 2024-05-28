import winston from 'winston';

// Create a Winston logger instance (customize as needed)
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.cli()
    // winston.format.simple(),
    // winston.format.prettyPrint() // Uncomment for more detailed info
  ),
});

export default logger;
