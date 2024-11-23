<?php
/**
 * The footer template
 *
 * @package Work_Encyclopedia
 */
?>

    <footer id="colophon" class="site-footer">
        <div class="container">
            <div class="site-info">
                <?php
                printf(
                    esc_html__('© %d %s. All rights reserved.', 'work-encyclopedia'),
                    date('Y'),
                    get_bloginfo('name')
                );
                ?>
            </div>
        </div>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>