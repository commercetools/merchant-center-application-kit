/* eslint-disable prettier/prettier */ // This file was automatically generated by json-schema-to-typescript.
// DO NOT MODIFY IT BY HAND. Instead, modify the source custom-view.schema.json file and run the build-schema:custom-view npm script.

export type CspDirective = string[];

export interface JSONSchemaForCustomViewConfigurationFiles {
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#name
   */
  name: string;
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#description
   */
  description?: string;
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#cloudidentifier
   */
  cloudIdentifier: string;
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#mcapiurl
   */
  mcApiUrl?: string;
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#oauthscopes
   */
  oAuthScopes: {
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#oauthscopesview
     */
    view: string[];
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#oauthscopesmanage
     */
    manage: string[];
  };
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#additionaloauthscopes
   */
  additionalOAuthScopes?: {
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#additionaloauthscopesname
     */
    name: string;
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#additionaloauthscopesview
     */
    view: string[];
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#additionaloauthscopesmanage
     */
    manage: string[];
  }[];
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#env
   */
  env: {
    development: {
      /**
       * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#envdevelopmentinitialprojectkey
       */
      initialProjectKey: string;
      teamId?: string;
      /**
       * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#envdevelopmenthosturipath
       */
      hostUriPath?: string;
    };
    production: {
      /**
       * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#envproductioncustomviewid
       */
      customViewId: string;
      /**
       * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#envproductionurl
       */
      url: string;
      /**
       * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#envproductioncdnurl
       */
      cdnUrl?: string;
    };
  };
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#additionalenv
   */
  additionalEnv?: {
    [k: string]: unknown;
  };
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#headers
   */
  headers?: {
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#headerscsp
     */
    csp?: {
      'connect-src': CspDirective;
      'font-src'?: CspDirective;
      'img-src'?: CspDirective;
      'script-src'?: CspDirective;
      'style-src'?: CspDirective;
      'frame-src'?: CspDirective;
    };
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#headerspermissionspolicies
     */
    permissionsPolicies?: {
      [k: string]: unknown;
    };
    /**
     * @deprecated
     */
    strictTransportSecurity?: ('includeSubDomains' | 'preload')[];
  };
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#labelalllocales
   */
  labelAllLocales: {
    locale: 'en' | 'de' | 'es' | 'fr-FR' | 'pt-BR';
    value: string;
  }[];
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#type
   */
  type: 'CustomPanel';
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#typesettings
   */
  typeSettings?: {
    /**
     * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#typesettingssize
     */
    size?: 'SMALL' | 'LARGE';
    [k: string]: unknown;
  };
  /**
   * See https://docs.commercetools.com/merchant-center-customizations/tooling-and-configuration/custom-view-config#locators
   */
  locators: string[];
  [k: string]: unknown;
}
