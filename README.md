<p align="center">
  <a href="https://www.sitecore.com/">
    <img src="https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/global/logo/sitecore-logo.svg?la=es-ES&hash=89E5BCF25116F0D8B53F53F0E3D33A0E" alt="RBE logo" target="_blank" width="200" height="165">
  </a>
</p>
<h3 align="center">Sitecore Search Starter Kit</h3>

<p align="center">
 A website built using React + Sitecore Search SDK for React
  <br>
  <a href="https://developers.sitecorecloud.io/search-sdk/react/website" target="_blank"><strong>Demo »</strong></a>
  <br>
  <br>

# Sitecore Search Starter Kit

This repository has an example implementation of a content website using the `Sitecore Search JS SDK` which
integrates with Sitecore Search services and supports event tracking.

## Table of contents

- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Pages](#Pages)
    - [Home](#Home)
    - [Search](#Search)
    - [Content detail page](#Content-detail-page)
- [Events](#Events)
    - [Monitoring example](#Monitoring-example)
- [Documentation](#learn-more)

## Prerequisites
### Node.js

The Search Starter Kit needs to have Node.js installed to build the project. We recommend using the LTS version of Node.js. You can find the latest version of Node.js [here](https://nodejs.org/en/).

### Environment variables

The Sitecore Search Starter Kit needs some environment variables to work. You can get the values for them in the [Developers resources section](https://doc.sitecore.com/discover/en/developers/discover-developer-guide/index_en.html?contextId=apiaccess) of Customer Engagement Console (CEC). For full functionality, create a **.env** file in the root of the project and add the following environment variables.

The following variables should exist within the **.env** file:

```
VITE_SEARCH_ENV=<environment - Expected values: prod, staging, prodEu or apse2 >
VITE_SEARCH_CUSTOMER_KEY=<customer key>
VITE_SEARCH_API_KEY=<API key provided in CEC>
VITE_SEARCH_PATH=<Path for the site>. This variable is optional, use it only if the site domain also includes an extra path.
```

## Quick start

To start using `Sitecore Search Starter Kit`:
1. Install [Node.js](htts://nodejs.org/en/). We recommend the LTS version.
2. Clone the repository: `git clone git@github.com:Sitecore/Sitecore-Search-JS-SDK-Starter-Kit.git`.
3. In the repository, to install all dependencies, run `npm install`.
4. In the root of the project, create a `.env` file then add the following environment variables to it:
```
VITE_SEARCH_ENV=<environment - Expected values: prod, staging or prodEu >
VITE_SEARCH_CUSTOMER_KEY=<customer key>
VITE_SEARCH_API_KEY=<API key provided in CEC>
VITE_SEARCH_PATH=<Path for the site> (optional)
```

5.  To start the development server, run `npm run dev`.
6.  To view the site, open your browser to **http://localhost:5174**
7.  To build the app for production, run: `npm run build`

## Pages

The JS SDK uses React Router to perform page navigation. Each page is a React component with a `useEffect` hook used to register uri change.

For example, for home page we have:

```javascript
useEffect(() => {
    PageController.getContext().setPageUri('/');
}.[]);
```

With this, the SDK can change browser context and customize tracking/service response.


### Home

Route: `/` shows the main page of the site.
This page is an example of how you can render widgets configured for the page in the CEC. The page component uses the `usePageWidgets` query hook and other recommendation widgets.

Events tracked are:

- A `widget appear` event per widget that appears on the page.

### Search

Route: `/search` shows the results returned after submitting the form in the header.

Events tracked are:

- A `widget appear` event for the search result widget present on the page.

### Content detail page

Route: `/detail/<content id>`. E.g.: `/detail/content-121212` shows the details of a specific content.

__Note:__
*In this example, the content information has been filtered from the `SearchResults` widget data for demonstration purposes. We do not recommend this approach in production. Restrict Search services to search and recommendations and create separate services for other data.*

Events tracked are:

- A `widget appear` event for the search result.

## Events

Events are an important part of the Search platform. The JS SDK automatically fires events it can infer when they happen. To register other events, you have to verbosely dispatch them.

Refer to the [JS SDK documentation](https://doc.sitecore.com/discover/en/developers/discover-js-sdk-for-react/index_en.html?contextId=events) for more about dispatching events.

### Monitoring example

An example of monitoring could be debug event tracking in the CEC. The following video shows how you can verify the events that the SDK trigger:

<br>


![](monitoring.gif)


## Documentation

Discover documentation is written for both developers and [business users](https://doc.sitecore.com/discover/en/users/discover-user-guide/index-en.html?contextId=introduction).

JS SDK for React documentation includes:
* [Components, functions, and query hooks](https://doc.sitecore.com/discover/en/developers/discover-js-sdk-for-react/index-en.html?contextId=introduction).
* [Templates and ui primitives](https://developers.sitecorecloud.io/discover-sdk/react/1.x-alpha/storybook/index.html).

For data feeds and URL configuration, refer to the [Discover developer guide](https://doc.sitecore.com/discover/en/developers/discover-js-sdk-for-react/index-en.html?contextId=introduction).

## Contributions

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve the Discover Starter Kit. The following sections explain how you can participate in these efforts.

### Bug reports

You can use GitHub to submit [bug reports](https://github.com/Sitecore/Sitecore-Search-JS-SDK-Starter-kit/issues/new?template=bug_report.md) for Discover Starter Kit.

### Feature requests

You can use GitHub to submit [feature requests](https://github.com/Sitecore/Discover-JS-SDK-Starter-kit/issues/new?template=feature_request.md) for Discover Starter Kit.


### Code of Conduct
Sitecore has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing Guide

If you want to make changes to the code, follow these steps:

1. Fork the Discover Starter Kit Repo GitHub repo.
2. Clone the forked repo to your local machine.
3. Create a feature branch from `main` for your changes. e.g. `git checkout -b my-feature-branch`
4. Run `npm install`
5. Run `npm run dev` (to preview your changes locally)
6. Commit, push to your remote fork of the Discover Starter Kit repo, then open a pull request (PR) to the `main` branch of the Developer Portal repo.

Your changes will be reviewed and merged if appropriate.
