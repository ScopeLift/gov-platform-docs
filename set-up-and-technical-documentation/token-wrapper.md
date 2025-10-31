---
hidden: true
icon: gift
---

# Token wrapper

A Governor contract expects a particular interface from its token contract. An OpenZeppelin Governor requires a token contract that implements the ERC20Votes interface or the ERC721Votes interface.

If the token is already deployed and it cannot be upgraded, the best workaround is to deploy a token wrapper contract that adds the voting interface to an existing token.

### UX tradeoffs&#x20;

Users will have to wrap their tokens to vote, and then unwrap them to use them in places that expect the unwrapped version. They may also be confused about where their token went after wrapping if their wallet doesn’t know about the wrapped version.

One thing to note is that setting up voting already requires setup: token holders have to delegate their votes – even to themselves – before voting. The wrapping step could be combined with delegation to keep the process simpler for token holders.



Interested in adding governor to an existing token? Reach out to [hello@tally.xyz.](mailto:hello@tally.xyz)
