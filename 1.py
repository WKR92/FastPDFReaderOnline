<a class="nav-item nav-link text-light" href="{{ url_for('about') }}">About</a>
<a class="nav-item nav-link text-light" href="{{ url_for('loadReader') }}">Load</a>


    {% if title %}
        <title>FastPDFReader - {{ title }}</title>
    {% else %}
        <title>FastPDFReader</title>
    {% endif %}