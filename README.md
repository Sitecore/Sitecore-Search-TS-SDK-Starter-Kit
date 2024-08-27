<p align="center">
  <a href="https://www.sitecore.com/">
    <img src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore?t=sc42h" alt="Sitecore logo" target="_blank" width="200" height="165">
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
VITE_SEARCH_CUSTOMER_KEY=<customer key>
VITE_SEARCH_API_KEY=<API key provided in CEC>
```

### CEC configuration

The account that will be used must have an initial configuration that needs to be made on CEC:

#### Sources

Information sources must be entered and processed in CEC, to populate the content catalog.

#### Suggestion Blocks

Suggestions blocks must have a field named `title_context_aware` (this needs to be configured for the `preview search widget`).
The following picture shows a sample configuration:

![Suggestion Blocks](https://developers.sitecorecloud.io/search-sdk/suggestion-blocks.png)

#### Sorting options

Sorting options must include `featured_desc` and `feature_asc` criteria pre-configured. The picture shows how it should look on CEC:

![Sorting options](https://developers.sitecorecloud.io/search-sdk/sorting-options.png)

#### Pre configured widgets

The account must have the following widgets created before:

| Name                                 | ID                              | Type           | Description                                                                                                                                                                                                                            | Used in                |
|--------------------------------------|---------------------------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| [Search Results Page] Search Results | `rfkid_7`                         | `Search Results` | Search results widget. Will include a grid with the results together with the avility to filter results by different facets.                                                                                                           | `/search`, `/detail/*` |
| Preview Search                       | `rfkid_6`                         | `Preview Search` | It is an input that does a quick search over the content. It is included on the page header.                                                                                                                                           | Every page             |
| SEO                                  | `search_seo`                      | `SEO`           | A SEO widget.                                                                                                                                                                                                                          | Every page             |
| Home Hero                            | `home_hero`                      | `HTML Block`     | An html block that appears at the home hero. It has rules to show content dependending on the language selected.                                                                                                                       | `/`                    |
| Highlight Title                      | `highlight_title`                 | `HTML Block`     | An html block with the title of the "Highlighted Articles" section.                                                                                                                                                                    | `/`                    |
| Search Home Highlights Articles      | `search_home_highlights_articles` | `Search Results` | Search Results widget used on the "Highlighted Articles section".                                                                                                                                                                      | `/`                    |
| N/A                                  | `rfkid_qa`                        | `Questions`      | This widget appears in the search page if the keyphase sent is recognized as a question. Please ask for support if this does not appears as it is still an experimental feature (This type of widget can't be created on CEC as well). | `/` , `/search`        |

Please, check our [demo website](https://developers.sitecorecloud.io/search-sdk/react/website) to check and visualize the different widgets. 

## Quick start

To start using `Sitecore Search Starter Kit`:
1. Install [Node.js](htts://nodejs.org/en/). We recommend the LTS version.
2. Clone the repository: `git clone git@github.com:Sitecore/Sitecore-Search-JS-SDK-Starter-Kit.git`.
3. In the repository, to install all dependencies, run `npm install`.
4. In the root of the project, create a `.env` file then add the following environment variables to it:
```
VITE_SEARCH_CUSTOMER_KEY=<customer key>
VITE_SEARCH_API_KEY=<API key provided in CEC>
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
The home page has the following configuration:

- 1st section: it is a content block with a locale rule to change the content if you switch the language.
- 2nd section: a content block with the title (same mechanism than 2nd section) and a `search` widget with a filter applied (type = blogs).

Events tracked are:

- A `widget appear` event per widget that appears on the page.

### Search

Route: `/search` shows the results returned after submitting the form in the header.
It contains:
- a `questions` widget in case that the application recognizes that the filtering term is a question (e.g.: `What is XM Cloud` ).
Otherwise, if it is not recognizing the search term as a question won't show anything
- A `search results` widget that will show on any case.

Events tracked are:

- A `widget appear` event for the questions and answer widget if it is present.
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

### Adding a new widget

The starter kit comes with the `@sitecore-search/cli` as a dev dependency. We also added a `package.json` script as a short cut to create
a widget based on the [templates available](https://developers.sitecorecloud.io/search-sdk/react/latest/storybook/index.html?path=/docs/widget-templates-introduction--page).

For widget creation, open a terminal in the root of the project and execute the following command:
`npm run create-widget`
Then follow the instructions from the wizard. 

More documentation for the cli can be found [here](https://www.npmjs.com/package/@sitecore-search/cli).

## Documentation

Sitecore Search SDK documentation is written for both developers and [business users](https://developers.sitecorecloud.io/search-sdk/react/1.x/storybook/index.html?path=/story/introduction-introduction--page).

JS SDK for React documentation includes:
* [Components, functions, and query hooks](https://developers.sitecorecloud.io/search-sdk/react/1.x/storybook/index.html?path=/story/sdk-hooks-introduction--page).
* [Templates and ui primitives](https://developers.sitecorecloud.io/search-sdk/react/1.x/storybook/index.html).

For data feeds and URL configuration, refer to the [Search developer guide](https://developers.sitecorecloud.io/search-sdk/react/1.x/storybook/index.html?path=/story/introduction-introduction--page).

## Contributions

We are very grateful to the community for contributing bug fixes and improvements. We welcome all efforts to evolve and improve the Search Starter Kit. The following sections explain how you can participate in these efforts.

### Bug reports

You can use GitHub to submit [bug reports](https://github.com/Sitecore/Sitecore-Search-TS-SDK-Starter-kit/issues/new?template=bug_report.md) for Search Starter Kit.

### Feature requests

You can use GitHub to submit [feature requests](https://github.com/Sitecore/Sitecore-Search-TS-SDK-Starter-kit/issues/new?template=feature_request.md) for Search Starter Kit.


### Code of Conduct
Sitecore has adopted a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect project participants to adhere to. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing Guide

If you want to make changes to the code, follow these steps:

1. Fork the Sitecore Search Starter Kit Repo GitHub repo.
2. Clone the forked repo to your local machine.
3. Create a feature branch from `main` for your changes. e.g. `git checkout -b my-feature-branch`
4. Run `npm install`
5. Run `npm run dev` (to preview your changes locally)
6. Commit, push to your remote fork of the Search Starter Kit repo, then open a pull request (PR) to the `main` branch of the Developer Portal repo.

Your changes will be reviewed and merged if appropriate.
