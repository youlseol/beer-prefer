# Security Policy

## Supported Versions

Currently, we are in active development. Security updates will be applied to the latest version.

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please follow these steps:

1. **Do Not** open a public issue
2. Send an email to the repository maintainers with:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

We will respond within 48 hours and work with you to understand and address the issue.

## Security Best Practices for Contributors

### Environment Variables

- **Never commit** `.env` files
- Use `.env.example` as a template
- Keep sensitive data in environment variables
- Document required environment variables in README

### Secrets and Keys

- **Never hardcode** API keys, passwords, or tokens
- Use environment variables for all sensitive configuration
- Rotate credentials regularly
- Use different credentials for development and production

### Database Security

- Always use parameterized queries (prepared statements)
- Never concatenate user input into SQL queries
- Validate and sanitize all user inputs
- Use TypeScript types for input validation

### Dependencies

- Keep dependencies up to date
- Run `npm audit` regularly
- Review security advisories
- Use lock files (`package-lock.json`)

### Code Review

- Review all pull requests for security issues
- Check for exposed secrets or credentials
- Verify input validation and sanitization
- Ensure proper error handling

## Security Checklist for Pull Requests

Before submitting a PR, ensure:

- [ ] No hardcoded secrets, keys, or tokens
- [ ] No `.env` files committed
- [ ] All user inputs are validated
- [ ] SQL queries use parameterized statements
- [ ] No sensitive data in logs or error messages
- [ ] Dependencies have no known vulnerabilities (`npm audit`)
- [ ] Environment variables documented

## Known Security Considerations

### Anonymous Tracking

- User preferences tracked via `device_id`
- No personal information collected
- Device IDs are client-generated and anonymous

### CORS Configuration

- CORS configured via environment variable
- Set `CORS_ORIGIN` appropriately for your deployment
- Use specific origins in production (not `*`)

### Database

- SQLite database used for development
- Consider using PostgreSQL or MySQL for production
- Ensure proper file permissions on database file
- Regular backups recommended

## Security Features

- ✅ Parameterized SQL queries (SQL injection prevention)
- ✅ Input validation on all endpoints
- ✅ CORS protection
- ✅ Environment-based configuration
- ✅ No PII collection
- ✅ Clean dependency tree

## Future Security Enhancements

When implementing authentication:
- Use JWT tokens with secure storage
- Implement HTTPS enforcement
- Add rate limiting
- Implement session management
- Add password hashing (bcrypt/argon2)
- Consider 2FA for sensitive operations

## Contact

For security concerns, please contact the repository maintainers through GitHub.

---

Last updated: 2025-10-24
