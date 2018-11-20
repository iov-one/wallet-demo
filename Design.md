# Design Process

The general workflow is from product owner - > designer -> product owner - > developer, and then back for refinements and review.

## Tooling

We use a zeplin.io account to hand off designs between the designers,product owner and the developers.
If you cannot see any of the links, please request access to the account.

## Styleguide

There is a general styleguide to define all the common UI elements, which will expand as we
develop the UI further. Please refer to this for clarification on any elements.

[UI Styleguide](zpl.io/awmW60J)

## New feature development

Product owner in consultation with marketing, strategy and dev builds a list of features that are specified in the backlog in the upcoming sprints, we need to have a clear set of requirements that feed into design are refined by both product and dev before accepting them into the sprint. This process should look like:

* Product defines the feature in terms of functionality and processes.
* Designer implements a proposal for the ui/ux for the feature 
* Product and Designer produce a specification and a wireframe
* Feature proposal is presented to developers at least one week before sprint start (planned biweekly design review meeting)
* Product and Designer have time to integrate any feedback (eg. what do we show when there are no transactions? when the network connection breaks?)
* Backlog grooming, developers discuss the backlog with product to ensure the requirements are understood and that concerns are articulted. The priority is set in the backlog with the most important at the top.
* Developers should accept story into sprint with an acceptable design done ahead of time

## Design implementation review

* Issue (#xxx) exists with specification and an attached link for the design (from above process)
* Developer makes a PR implementing those changes (linking it with "Closes #xxx")
* Developer may raise questions about details while coding, which should be updated quickly
* When implemented, request PR review from the designer
* Designer may approves it, or adds comments for needed fixes. Comments can be provided with a link to the zeplin design if easier.
* Developer addresses changes if needed and requests review again
* Once approved, PR and issue are closed 👍
