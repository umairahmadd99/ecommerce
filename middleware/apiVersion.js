const logger = require('../utils/logger');

const apiVersionMiddleware = (req, res, next) => {
  // Extract version from URL path
  const versionMatch = req.path.match(/^\/api\/(v\d+)\//);
  const requestedVersion = versionMatch ? versionMatch[1] : null;
  const currentVersion = process.env.API_VERSION || 'v1';

  // Log API version access
  logger.info({
    message: 'API version accessed',
    requestedVersion,
    currentVersion,
    path: req.path,
    method: req.method
  });

  // For now, we only support v1, but this structure allows for easy version management
  if (requestedVersion && requestedVersion !== currentVersion) {
    return res.status(400).json({
      success: false,
      error: `API version ${requestedVersion} is not supported. Current version is ${currentVersion}`,
      supportedVersions: [currentVersion]
    });
  }

  // Add version info to request object for potential use in controllers
  req.apiVersion = requestedVersion || currentVersion;
  
  next();
};

module.exports = apiVersionMiddleware; 