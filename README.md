![](https://img.shields.io/github/package-json/v/kaskadi/stock-report)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/stock-report?color=blue)

**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/stock-report/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/stock-report/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/stock-report/build?label=build&logo=mocha)](https://github.com/kaskadi/stock-report/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/stock-report/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/stock-report/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/stock-report?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/stock-report)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/stock-report?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/stock-report)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/stock-report?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/stock-report)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/stock-report?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/stock-report/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# Resources documentation

The following lambda functions are defined in this repository:
- [stock-report](#stock-report)

The following layers are defined in this repository:
- [stock-report-layer](#stock-report-layer)

## stock-report <a name="stock-report"></a>

|     Name     | Sources                    | Timeout |            Handler           | Layers                                                      |
| :----------: | :------------------------- | :-----: | :--------------------------: | :---------------------------------------------------------- |
| stock-report | <ul><li>SCHEDULE</li></ul> | default | [handler](./stock-report.js) | <ul><li>[stock-report-layer](#stock-report-layer)</li></ul> |

See [configuration file](./serverless.yml) for more details.

## stock-report-layer <a name="stock-report-layer"></a>

### Description

Layer for stock-report

### Dependencies

- `aws-es-client`, version: `^1.0.1` ([see on NPM](https://www.npmjs.com/package/aws-es-client))
- `sendmail`, version: `^1.6.1` ([see on NPM](https://www.npmjs.com/package/sendmail))

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value        |
| :----------- | :----------- |
| app          | kaskadi      |
| service      | stock-report |
| logical-unit | stocks       |
| type         | schedule     |
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->