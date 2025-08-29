import type { Schema, Struct } from '@strapi/strapi';

export interface BlockFaq extends Struct.ComponentSchema {
  collectionName: 'components_block_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    items: Schema.Attribute.Component<'ui.title-description', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFeaturedArticles extends Struct.ComponentSchema {
  collectionName: 'components_block_featured_articles';
  info: {
    displayName: 'Featured Articles';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFeaturedProjects extends Struct.ComponentSchema {
  collectionName: 'components_block_featured_projects';
  info: {
    displayName: 'Featured Projects';
  };
  attributes: {
    link: Schema.Attribute.Component<'ui.link', false>;
    projects: Schema.Attribute.Relation<'oneToMany', 'api::project.project'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFeaturedServices extends Struct.ComponentSchema {
  collectionName: 'components_block_featured_services';
  info: {
    displayName: 'Featured Services';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
    title: Schema.Attribute.String;
  };
}

export interface BlockFullSection extends Struct.ComponentSchema {
  collectionName: 'components_block_full_sections';
  info: {
    displayName: 'Full Section';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'ui.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockHero extends Struct.ComponentSchema {
  collectionName: 'components_block_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'ui.button', true>;
    colored_title: Schema.Attribute.String;
    cover: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Schema.Attribute.String;
    form: Schema.Attribute.Component<'form.form', false>;
    links: Schema.Attribute.Component<'ui.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlockInfo extends Struct.ComponentSchema {
  collectionName: 'components_block_infos';
  info: {
    displayName: 'Info';
  };
  attributes: {
    align_content: Schema.Attribute.Enumeration<['left', 'right', 'center']>;
    button: Schema.Attribute.Component<'ui.button', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'ui.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockList extends Struct.ComponentSchema {
  collectionName: 'components_block_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    button: Schema.Attribute.Component<'ui.button', false>;
    items: Schema.Attribute.Component<'ui.card', true>;
    link: Schema.Attribute.Component<'ui.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface BlockSolution extends Struct.ComponentSchema {
  collectionName: 'components_block_solutions';
  info: {
    displayName: 'Solution';
  };
  attributes: {
    items: Schema.Attribute.Component<'ui.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface FormForm extends Struct.ComponentSchema {
  collectionName: 'components_form_forms';
  info: {
    displayName: 'Form';
  };
  attributes: {
    button: Schema.Attribute.Component<'ui.button', false>;
    description: Schema.Attribute.String;
    input: Schema.Attribute.Component<'form.input', true>;
    select: Schema.Attribute.Component<'form.select', true>;
    textarea: Schema.Attribute.Component<'form.textarea', true>;
    title: Schema.Attribute.String;
  };
}

export interface FormInput extends Struct.ComponentSchema {
  collectionName: 'components_form_inputs';
  info: {
    displayName: 'Input';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    type: Schema.Attribute.String;
  };
}

export interface FormSelect extends Struct.ComponentSchema {
  collectionName: 'components_form_selects';
  info: {
    displayName: 'Select';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    options: Schema.Attribute.JSON;
    required: Schema.Attribute.Boolean;
  };
}

export interface FormTextarea extends Struct.ComponentSchema {
  collectionName: 'components_form_textareas';
  info: {
    displayName: 'Textarea';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    rows: Schema.Attribute.Integer;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    description: Schema.Attribute.Text;
    footer_column: Schema.Attribute.Component<'global.footer-column', true>;
    link: Schema.Attribute.Component<'ui.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface GlobalFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_global_footer_columns';
  info: {
    displayName: 'Footer column';
  };
  attributes: {
    links: Schema.Attribute.Component<'ui.button', true>;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GlobalNavigaion extends Struct.ComponentSchema {
  collectionName: 'components_global_navigaions';
  info: {
    displayName: 'Navigaion';
  };
  attributes: {
    links: Schema.Attribute.Component<'global.navigation-item', true>;
    logo: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface GlobalNavigationItem extends Struct.ComponentSchema {
  collectionName: 'components_global_navigation_items';
  info: {
    displayName: 'Navigation Item';
  };
  attributes: {
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface GlobalSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_global_social_medias';
  info: {
    displayName: 'Social Media';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    icon_name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    meta_cannical_url: Schema.Attribute.String;
    meta_description: Schema.Attribute.String;
    meta_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    meta_title: Schema.Attribute.String;
    prevent_index: Schema.Attribute.Boolean;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['button', 'submit', 'reset']>;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      [
        'primary',
        'primary-outline',
        'secondary',
        'secondary-outline',
        'tertiary',
        'tertiary-outline',
        'ghost',
      ]
    >;
  };
}

export interface UiCard extends Struct.ComponentSchema {
  collectionName: 'components_ui_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Component<'ui.icon', false>;
    title: Schema.Attribute.String;
  };
}

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

export interface UiLink extends Struct.ComponentSchema {
  collectionName: 'components_ui_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      [
        'primary',
        'primary-outline',
        'secondary',
        'secondary-outline',
        'tertiary',
        'tertiary-outline',
        'ghost',
      ]
    >;
  };
}

export interface UiLogo extends Struct.ComponentSchema {
  collectionName: 'components_ui_logos';
  info: {
    displayName: 'Logo';
    icon: 'eye';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    show_logo: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface UiTitleDescription extends Struct.ComponentSchema {
  collectionName: 'components_ui_title_descriptions';
  info: {
    displayName: 'Title description';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'block.faq': BlockFaq;
      'block.featured-articles': BlockFeaturedArticles;
      'block.featured-projects': BlockFeaturedProjects;
      'block.featured-services': BlockFeaturedServices;
      'block.full-section': BlockFullSection;
      'block.hero': BlockHero;
      'block.info': BlockInfo;
      'block.list': BlockList;
      'block.solution': BlockSolution;
      'form.form': FormForm;
      'form.input': FormInput;
      'form.select': FormSelect;
      'form.textarea': FormTextarea;
      'global.footer': GlobalFooter;
      'global.footer-column': GlobalFooterColumn;
      'global.navigaion': GlobalNavigaion;
      'global.navigation-item': GlobalNavigationItem;
      'global.social-media': GlobalSocialMedia;
      'seo.seo': SeoSeo;
      'ui.button': UiButton;
      'ui.card': UiCard;
      'ui.icon': UiIcon;
      'ui.link': UiLink;
      'ui.logo': UiLogo;
      'ui.title-description': UiTitleDescription;
    }
  }
}
