<?php

namespace App\Services;

class Html
{
    public static function clean(string $html): string
    {
        $config = \HTMLPurifier_Config::createDefault();
        $config->set('Cache.DefinitionImpl', null);
        $config->set('HTML.Allowed', 'p,br,strong,b,em,i,u,ul,ol,li,blockquote,h2,h3,h4,a[href|title],table,thead,tbody,tr,th[colspan|rowspan],td[colspan|rowspan]');
        $config->set('URI.AllowedSchemes', ['http' => true, 'https' => true, 'mailto' => true]);

        return (new \HTMLPurifier($config))->purify($html);
    }
}
