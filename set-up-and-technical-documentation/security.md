---
icon: diamond-exclamation
description: Tally Security Vulnerability Disclosure Policy
---

# Security

At Tally, we take security seriously and value the contributions of security researchers who help keep our platform and users safe. This policy provides guidelines for conducting security research and reporting vulnerabilities responsibly.

To report a vulnerability, reach out to security@tally.xyz

### Scope

#### In Scope

* Main application at tally.xyz
* Associated subdomains
* API endpoints
* Web application functionality
* Authentication mechanisms
* Smart contract interactions

#### Out of Scope

* Denial of Service (DoS) attacks
* Spam attacks
* Social engineering attacks
* Physical security attacks
* Third-party applications or websites
* Issues already reported by another researcher
* Issues in third-party dependencies that are already publicly known

### Guidelines for Security Researchers

1. **Do No Harm**:
   * Do not attempt to access, modify, or delete data belonging to other users
   * Do not attempt to degrade or disrupt our services
   * Do not use automated scanning tools without explicit permission
   * Do not attempt to phish or social engineer our employees or users
2. **Testing Requirements**:
   * Only test against accounts you own or have explicit permission to test
   * Create a separate test account for security research
   * Do not test in a way that could impact other users or the platform's stability
   * Immediately stop testing if you encounter sensitive user data

### Reporting Process

1. **Initial Report**: Submit your findings through our secure bug reporting platform or email [security@tally.xyz](mailto:security@tally.xyz) with:
   * Detailed description of the vulnerability
   * Steps to reproduce
   * Proof of concept
   * Impact assessment
   * Suggested remediation (if any)
2. **Response Timeline**:
   * Initial acknowledgment: Within 24 hours
   * Triage and severity assessment: Within 3 business days
   * Regular updates on fix progress: Every 5 business days
   * Resolution timeline based on severity:
     * Critical: 7 days
     * High: 30 days
     * Medium: 60 days
     * Low: 90 days

### Reward Structure

Rewards are based on severity and quality of report:



| Severity | Reward Range   |
| -------- | -------------- |
| Critical | $5,000-$25,000 |
| High     | $2,500-$5,000  |
| Medium   | $500-$2,000    |
| Low      | $100-500       |

```
```

#### Severity Criteria

**Critical**:

* Direct loss of user funds
* Smart contract vulnerabilities leading to theft
* Remote code execution
* Access to private keys or sensitive credentials\*

**High**:

* Authentication bypass
* Significant information disclosure
* Smart contract vulnerabilities affecting functionality
* Stored cross-site scripting

**Medium**:

* Reflected cross-site scripting
* Cross-site request forgery
* Race conditions without direct impact
* Logical flaws affecting non-critical functions

**Low**:

* Missing security headers
* Minor information disclosure
* Weak password policies
* Non-sensitive data exposure

_\*Note that public environment variables such as RPC endpoints are not considered sensitive._

### Public Disclosure

* Please allow us 90 days before public disclosure
* Coordinate disclosure timing with our security team
* We encourage responsible disclosure through our bug bounty email address
* Credit will be given to researchers who follow these guidelines

### Safe Harbor

We will not pursue legal action against researchers who:

* Follow this responsible disclosure policy
* Make good faith efforts to avoid privacy violations, destruction of data, and interruption or degradation of our services
* Do not exploit vulnerabilities beyond the minimum necessary to demonstrate the vulnerability

### Contact

* Primary Contact: [security@tally.xyz](mailto:security@tally.xyz)

### Updates to Policy

This policy may be updated from time to time. Please review it before starting any security research or submitting reports.
