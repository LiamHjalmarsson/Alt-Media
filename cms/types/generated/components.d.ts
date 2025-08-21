import type { Schema, Struct } from '@strapi/strapi';

export interface UiIcon extends Struct.ComponentSchema {
  collectionName: 'components_ui_icons';
  info: {
    displayName: 'Icon';
    icon: 'alien';
  };
  attributes: {
    has_image: Schema.Attribute.Boolean;
    image: Schema.Attribute.Media<'images' | 'files'>;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ui.icon': UiIcon;
    }
  }
}
