class apt_update {
    exec { "aptGetUpdate":
        command => "sudo apt-get update",
        path => ["/bin", "/usr/bin"]
    }
}

class othertools {
    package { "git":
        ensure => latest,
        require => Exec["aptGetUpdate"]
    }

    package { "vim-common":
        ensure => latest,
        require => Exec["aptGetUpdate"]
    }

    package { "curl":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }

    package { "htop":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }

    package { "g++":
        ensure => present,
        require => Exec["aptGetUpdate"]
    }
}

class nodejs {
  file { '/vagrant':
    ensure => 'directory',
  }

  exec { "git_clone_n":
    command => "git clone https://github.com/tj/n.git /home/n",
    creates => '/home/n/Makefile',
    path => ["/bin", "/usr/bin"],
    require => [Exec["aptGetUpdate"], Package["git"], Package["curl"], Package["g++"]]
  }

  exec { "install_n":
    command => "make install",
    path => ["/bin", "/usr/bin"],
    cwd => "/home/n",
    require => Exec["git_clone_n"]
  }

  exec { "install_node":
    command => "n latest",
    path => ["/bin", "/usr/bin", "/usr/local/bin"],
    require => [Exec["git_clone_n"], Exec["install_n"]]
  }

  exec { "npm-update":
    # cwd => "/vagrant",
    command => "npm -g update",
    #onlyif => ["test -d /vagrant/node_modules"],
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install_node"], File['/vagrant']]
  }

  exec { "npm-bower":
    # cwd => "/vagrant",
    command => "sudo npm -g install bower",
    #onlyif => ["test -d /vagrant/node_modules"],
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install_node"], File['/vagrant'], Exec["npm-update"]]
  }

  exec { "npm-sails":
    # cwd => "/vagrant",
    command => "sudo npm -g install sails",
    #onlyif => ["test -d /vagrant/node_modules"],
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install_node"], File['/vagrant'], Exec["npm-update"]]
  }

  exec { "npm-gulp":
    # cwd => "/vagrant",
    command => "sudo npm -g install gulp",
    #onlyif => ["test -d /vagrant/node_modules"],
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"],
    require => [Exec["install_node"], File['/vagrant'], Exec["npm-update"]]
  }
}

class mongodb {
  class {'::mongodb::globals':
    manage_package_repo => true
  }->
  class {'::mongodb::server':
    port    => 27017,
    bind_ip => ['0.0.0.0'],
    verbose => true,
    ensure  => "present"
  }->
  class {'::mongodb::client': }
}

class redis-cl {
  class { 'redis': }
}

include apt_update
include othertools
include nodejs
include mongodb
include redis-cl
