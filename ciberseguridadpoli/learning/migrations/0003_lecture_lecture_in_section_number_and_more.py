# Generated by Django 5.2 on 2025-05-28 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('learning', '0002_section_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='lecture',
            name='lecture_in_section_number',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AddField(
            model_name='lecturecontent',
            name='content_in_lecture_number',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='section',
            name='section_number',
            field=models.IntegerField(default=0, null=True),
        ),
    ]
