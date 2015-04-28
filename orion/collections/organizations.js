/**
 * We declare the collection just like meteor default way
 * but changing Meteor.Collection to orion.collection.
 *
 * We can set options to that new collection, like which fields
 * we will show in the index of the collection in the admin
 */
Organizations = new orion.collection('organizations', {
  singularName: 'organization', // The name of one of this items
  pluralName: 'organizations', // The name of more than one of this items
  link: {
    /**
     * The text that you want to show in the sidebar.
     * The default value is the name of the collection, so
     * in this case is not necesary
     */
    title: 'Organizations'
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    columns: [
      { data: "name", title: "Name" },
      /**
       * If you want to show a custom orion attribute in
       * the index table you must call this function
       * orion.attributeColumn(attributeType, key, label)
       */
      orion.attributeColumn('file', 'logo', 'Logo'),
      // orion.attributeColumn('summernote', 'description', 'Description'),
      orion.attributeColumn('createdBy', 'createdBy', 'Created By'),
      orion.attributeColumn('createdAt', 'createdAt', 'Created At')
    ]
  }
});

/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Organizations.attachSchema(new SimpleSchema({
  name: {
    type: String
  },

  owner: orion.attribute('user', {
    label: 'Owner'
  },{
    publicationName: 'owner',
  }),

  admins: orion.attribute('users', {
    label: 'Admins'
  },{
    publicationName: 'admins',
  }),

  members: orion.attribute('users', {
    label: 'Members'
  },{
    publicationName: 'members',
  }),

  suborgs: orion.attribute('hasMany', {
    label: 'Sub Organizations'
  },{
    collection: Organizations,
    publicationName: 'suborgs'

  }),

  /**
   * The file attribute is a custom orion attribute
   * This is where orion do the magic. Just set
   * the attribute type and it will automatically
   * create the form for the file.
   * WARNING: the url of the image will not be saved in
   * .image, it will be saved in .image.url.
   */
  logo: orion.attribute('file', {
      label: 'Logo',
      optional: true
  }),
  /**
   * Here its the same with image attribute.
   * summernote is a html editor.
   */
  description: orion.attribute('summernote', {
      label: 'Description'
  }),
  /**
   * This attribute sets the user id of the user that created
   * this post automatically.
   */
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));


/**
 * Using dburles:collection-helpers we will add a helper to the posts
 * collection to easily get the user
 */

Organizations.helpers({
  getCreator: function () {
    return Meteor.users.findOne({ _id: this.createdBy });
  }
});
