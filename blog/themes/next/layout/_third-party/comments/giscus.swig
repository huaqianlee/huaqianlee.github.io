{%- if page.comments %}
<script src="https://giscus.app/client.js"
        data-repo="{{ theme.giscus.repo }}"
        data-repo-id="{{ theme.giscus.repo_id }}"
        data-category="{{ theme.giscus.category }}"
        data-category-id="{{ theme.giscus.category_id }}"
        data-mapping="{{ theme.giscus.mapping }}"
        data-strict="{{ theme.giscus.strict }}"
        data-reactions-enabled="{{ theme.giscus.reactions_enabled }}"
        data-emit-metadata="{{ theme.giscus.emit_metadata }}"
        data-input-position="{{ theme.giscus.input_position }}"
        data-theme="{{ theme.giscus.theme }}"
        data-lang="{{ theme.giscus.language }}"
        crossorigin="anonymous"
        async>
</script>
{%- endif %}
