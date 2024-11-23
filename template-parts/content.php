<?php
/**
 * Template part for displaying posts
 *
 * @package Work_Encyclopedia
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <?php
        if (is_singular()) :
            the_title('<h1 class="entry-title">', '</h1>');
        else :
            the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>');
        endif;
        ?>
    </header>

    <?php if (has_post_thumbnail()) : ?>
        <div class="post-thumbnail">
            <?php the_post_thumbnail(); ?>
        </div>
    <?php endif; ?>

    <div class="entry-content">
        <?php
        the_content();

        wp_link_pages(array(
            'before' => '<div class="page-links">' . esc_html__('Pages:', 'work-encyclopedia'),
            'after' => '</div>',
        ));
        ?>
    </div>

    <footer class="entry-footer">
        <?php
        $categories_list = get_the_category_list(esc_html__(', ', 'work-encyclopedia'));
        if ($categories_list) {
            printf('<span class="cat-links">' . esc_html__('Posted in %1$s', 'work-encyclopedia') . '</span>', $categories_list);
        }

        $tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'work-encyclopedia'));
        if ($tags_list) {
            printf('<span class="tags-links">' . esc_html__('Tagged %1$s', 'work-encyclopedia') . '</span>', $tags_list);
        }
        ?>
    </footer>
</article>