<div class="pixcode  pixcode--progressbar  progressbar">
	<?php if ($title): ?>
		<div class="progressbar__title"><?php echo $title; ?></div>
	<?php endif; ?>
	<div class="progressbar__bar">
		<div class="progressbar__progress" style="width: <?php echo $progress ?>">
			<div class="progressbar__tooltip"><?php echo $progress ?></div>
		</div>
	</div>
</div>