import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: "Featured",
      name: "isFeatured",
      type: "boolean",
      initialValue: () => false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: "Project URL",
      name: "projectUrl",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "startedOn",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completedOn",
      type: "date",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "colors",
      type: "array",
      of: [
        {
          type: "string",
          placeholder: "hex color code",
          validation: (rule) =>
            rule.all([rule.required(), rule.regex(/#([0-9a-fA-F]{2})+/)]),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
