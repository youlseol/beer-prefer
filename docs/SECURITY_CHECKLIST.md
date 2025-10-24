# Security Checklist

Quick reference security checklist for developers and reviewers.

## Before Committing Code

### Environment Variables
- [ ] No `.env` files committed
- [ ] All secrets in environment variables
- [ ] `.env.example` updated if new variables added
- [ ] No hardcoded API keys, passwords, or tokens

### Code Review
- [ ] No sensitive data in console.log statements
- [ ] SQL queries use parameterized statements
- [ ] User inputs are validated
- [ ] Error messages don't expose sensitive info
- [ ] No commented-out credentials or keys

### Dependencies
- [ ] `npm audit` shows no vulnerabilities
- [ ] Lock files (`package-lock.json`) updated
- [ ] No unnecessary dependencies added

## Pull Request Checklist

- [ ] All CI checks passing
- [ ] Security scan completed
- [ ] No hardcoded secrets in diff
- [ ] Environment variables documented
- [ ] Input validation implemented
- [ ] SQL injection prevention verified

## Deployment Checklist

### Pre-deployment
- [ ] Environment variables configured for production
- [ ] HTTPS enforced
- [ ] CORS_ORIGIN set to production domain
- [ ] NODE_ENV set to 'production'
- [ ] Database credentials secured
- [ ] Rate limiting configured (if applicable)

### Post-deployment
- [ ] Security headers verified
- [ ] SSL/TLS certificate valid
- [ ] Monitoring and logging enabled
- [ ] Backup system operational
- [ ] Security incident response plan in place

## Regular Maintenance

### Weekly
- [ ] Review access logs for anomalies
- [ ] Check for failed authentication attempts
- [ ] Monitor error rates

### Monthly
- [ ] Run `npm audit` on all packages
- [ ] Review dependency updates
- [ ] Check security advisories
- [ ] Rotate credentials (if applicable)

### Quarterly
- [ ] Full security audit
- [ ] Penetration testing (if applicable)
- [ ] Review and update security policies
- [ ] Team security training

## Common Security Pitfalls to Avoid

### ❌ Don't Do This
```typescript
// Hardcoded credentials
const API_KEY = "sk_live_123456789";

// String concatenation in SQL
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Exposing sensitive data in errors
console.error("Database connection failed:", {
  password: dbPassword,
  host: dbHost
});

// Committing .env files
git add .env
```

### ✅ Do This Instead
```typescript
// Use environment variables
const API_KEY = process.env.API_KEY;

// Use parameterized queries
const query = db.prepare('SELECT * FROM users WHERE id = ?');
const user = query.get(userId);

// Safe error logging
console.error("Database connection failed - check configuration");

// Ensure .gitignore excludes sensitive files
# .gitignore
.env
.env.*
!.env.example
```

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [SQLite Security](https://www.sqlite.org/security.html)

## Quick Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Search for potential secrets in code
git grep -i "password\|secret\|key\|token" -- '*.ts' '*.js'

# Check git history for sensitive files
git log --all --full-history -- '.env'

# Verify .gitignore is working
git check-ignore -v .env
```

## Contact

For security concerns, refer to [SECURITY.md](../SECURITY.md) for reporting procedures.

---

Last updated: 2025-10-24
