---
description: Tally offers simplified tuple arrays in Custom Actions.
---

# Tuple Support

Tally's Custom Action builder supports the `tuple[]` type, called tuple arrays.

### What are tuple arrays?

The `tuple`type in Soldity is a data structure that contains a fixed number of elements, each of which can be of a different type. For instance, a tuple can contain an integer, a string, and a boolean value all together. The `tuple[]`type, called a "tuple array", contains a list of tuples.

### Building a tuple array

To create a proposal with a tuple array, add Custom Actions to your proposal. Then, use the imported ABI. Tally will infer the type from the ABI and help build the tuple array.

<figure><img src="../../../../.gitbook/assets/image (129).png" alt=""><figcaption></figcaption></figure>

### Nested tuples

If a tuple or tuple array is nested in _another_ tuple, enter the nested tuple(s) in plaintext with brackets. This tuple builder contains two nested tuple arrays, `contactDetails`and `chains` , and one nested tuple `bountyTerms` :

<div data-full-width="true"><figure><img src="../../../../.gitbook/assets/Screenshot 2025-01-06 at 11.22.41 AM.png" alt=""><figcaption><p>tuple builder with empty nested tuples</p></figcaption></figure></div>

To add tuple arrays and tuples, enter them in plaintext:

<figure><img src="../../../../.gitbook/assets/Screenshot 2025-01-06 at 11.38.58 AM (4).png" alt=""><figcaption><p>tuple builder with filled-in nested tuples</p></figcaption></figure>

{% embed url="https://drive.google.com/file/d/1VuNXBZ6PagsREaFsaNWWZbCRA9HF5JG3/view?usp=sharing" %}
