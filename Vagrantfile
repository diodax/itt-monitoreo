# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Switched boxes due to this bug: https://github.com/mitchellh/vagrant/issues/6426#issuecomment-234977448
  # config.vm.box = "hashicorp/precise64"
  config.vm.box = "ubuntu/precise64"

  # config.vm.network :forwarded_port, guest: 3000, host: 3000, auto_correct: true
  # Add port-forward for Redis
  config.vm.network :forwarded_port, guest: 6379, host: 6379 #, auto_correct: true
  # Add port-forward for Node-inspector
  config.vm.network :forwarded_port, guest: 5858, host: 5858 #, auto_correct: true
  # Add port-forward Sails.js application
  config.vm.network :forwarded_port, guest: 1337, host: 1337 #, auto_correct: true
  # Add port-forward for the MongoDB service
  config.vm.network :forwarded_port, guest: 3000, host: 3000 #, auto_correct: true
  config.vm.network :forwarded_port, guest: 27017, host: 27017 #, auto_correct: true

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network :private_network, ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network :public_network

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/home/vagrant", create: true

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # VirtualBox:
  config.vm.provider :virtualbox do |vb|
    # Use VBoxManage to customize the VM. To change memory:
    vb.customize ["modifyvm", :id, "--memory", "1024"]
  end

  # Enable provisioning with Puppet stand alone.  Puppet manifests
  # are contained in a directory path relative to this Vagrantfile.
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "puppet/manifests"
    puppet.module_path    = "puppet/modules"
    puppet.manifest_file  = "main.pp"
    puppet.options        = [
                              '--verbose',
                              #'--debug',
                            ]
  end
end
