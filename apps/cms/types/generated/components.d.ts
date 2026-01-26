import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageBookClub extends Struct.ComponentSchema {
  collectionName: 'components_homepage_book_clubs';
  info: {
    displayName: 'Book Club';
  };
  attributes: {};
}

export interface HomepageDecorative extends Struct.ComponentSchema {
  collectionName: 'components_homepage_decoratives';
  info: {
    displayName: 'Decorative';
  };
  attributes: {
    type: Schema.Attribute.Enumeration<['stars', 'magnet-lines']> &
      Schema.Attribute.Required;
  };
}

export interface HomepageEventList extends Struct.ComponentSchema {
  collectionName: 'components_homepage_event_lists';
  info: {
    displayName: 'Event List';
  };
  attributes: {
    event_items: Schema.Attribute.Relation<
      'oneToMany',
      'api::event-item.event-item'
    >;
    sort: Schema.Attribute.Enumeration<['ascending', 'descending']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'descending'>;
  };
}

export interface HomepageHeader extends Struct.ComponentSchema {
  collectionName: 'components_homepage_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageImage extends Struct.ComponentSchema {
  collectionName: 'components_homepage_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    source: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface HomepageMedia extends Struct.ComponentSchema {
  collectionName: 'components_homepage_media';
  info: {
    displayName: 'Media';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    release: Schema.Attribute.Date;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['music', 'movie', 'series', 'book']> &
      Schema.Attribute.Required;
  };
}

export interface HomepageProject extends Struct.ComponentSchema {
  collectionName: 'components_homepage_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    cover: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    project: Schema.Attribute.Relation<'oneToOne', 'api::project.project'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'homepage.book-club': HomepageBookClub;
      'homepage.decorative': HomepageDecorative;
      'homepage.event-list': HomepageEventList;
      'homepage.header': HomepageHeader;
      'homepage.image': HomepageImage;
      'homepage.media': HomepageMedia;
      'homepage.project': HomepageProject;
    }
  }
}
